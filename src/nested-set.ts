interface INode {
  _id: number;
  lkey: number;
  rkey: number;
  depth: number;
  childs: number;
  parentId: number;
  itemId: number;
}

interface INestedSet {
  Structure: INode[];
  Data: object;
}

class NestedSet {
  constructor() {
    this.Structure = [];
    this.Data = {};
  }

  setItem = (itemId: number, itemData: any) => {
    this.Data[itemId] = itemData;
    return this.Data[itemId];
  };

  getItem = (itemId: number) => this.Data[itemId];

  removeItem = (itemId: number) => {
    if (this.Data[itemId] !== undefined) {
      for (var i = 0; i < this.Structure.length; i++) {
        if (this.Structure[i].itemId === itemId) {
          this.removeNode(this.Structure[i]._id);
        }
      }
      delete this.Data[itemId];
      return true;
    } else {
      return false;
    }
  };

  addRoot = (itemId: number) => {
    if (this.Data[itemId] !== undefined) {
      this.removeNodes();
      this.Structure.push({
        _id: 1,
        lkey: 1,
        rkey: 2,
        depth: 1,
        childs: 0,
        parentId: 0,
        itemId: itemId,
      });
    }
    return this.Structure[0]._id;
  };

  getRoot = () => this.getNodes()[0];

  getMaxId = () =>
    this.Structure.reduce(
      (a, { _id }) => (a > _id ? a : _id),
      -Infinity,
    );

  addNode = (targetNodeId: number, itemId: number) => {
    if (this.Data[itemId] !== undefined) {
      var parentNode = this.getNode(targetNodeId, true);

      if (!parentNode) {
        return false;
      }

      var maxId = this.getMaxId();

      this.Structure = this.Structure.map((n) => {
        if (n.lkey > parentNode.rkey) {
          n.lkey += 2;
          n.rkey += 2;
        }
        if (n.rkey >= parentNode.rkey && n.lkey < parentNode.rkey) {
          n.rkey += 2;
          n.childs++;
        }
        return n;
      });

      this.Structure.push({
        _id: maxId + 1,
        lkey: parentNode.rkey,
        rkey: parentNode.rkey + 1,
        depth: parentNode.depth + 1,
        childs: 0,
        parentId: parentNode._id,
        itemId: itemId,
      });

      return maxId + 1;
    }
  };

  getNode = (nodeId: number, asCopy: boolean) => {
    var selectedNode = this.Structure.filter((n) => n._id === nodeId);
    if (Array.isArray(selectedNode) && selectedNode.length === 1) {
      if (asCopy === true) {
        return { ...selectedNode[0] };
      } else {
        return selectedNode[0];
      }
    } else {
      return false;
    }
  };

  removeNode = (nodeId: number) => {
    var selectedNode = this.getNode(nodeId, true);
    var lengthBranchRem = this.getChilds(nodeId).length + 1;

    if (!selectedNode) {
      return false;
    }

    this.Structure = this.getNodes()
      .map((n) => {
        if (
          n.rkey > selectedNode.rkey &&
          n.lkey < selectedNode.lkey
        ) {
          n.childs = n.childs - lengthBranchRem;
        }
        return n;
      })
      .filter(
        (n) =>
          !(
            n.lkey >= selectedNode.lkey && n.rkey <= selectedNode.rkey
          ),
      )
      .map((n) => {
        if (n.rkey > selectedNode.rkey) {
          n.lkey =
            n.lkey > selectedNode.lkey
              ? n.lkey - (selectedNode.rkey - selectedNode.lkey + 1)
              : n.lkey;
          n.rkey =
            n.rkey - (selectedNode.rkey - selectedNode.lkey + 1);
        }
        return n;
      });

    return this.Structure;
  };

  moveNode = (nodeId, targetNodeId) => {
    var movedNode = this.getNode(nodeId, true);
    var targetNode = this.getNode(targetNodeId, true);

    var level = movedNode.depth;
    var rightKey = movedNode.rkey;
    var leftKey = movedNode.lkey;

    var levelUp = targetNode.depth;
    var rightKeyNear = targetNode.rkey - 1;

    var skewLevel = levelUp - level + 1;
    var skewTree = rightKey - leftKey + 1;

    var skewEdit;

    if (rightKeyNear > rightKey) {
      skewEdit = rightKeyNear - leftKey + 1 - skewTree;
      this.Structure = this.Structure.map((n) => {
        if (n.lkey <= rightKeyNear && n.rkey > leftKey) {
          if (n.rkey <= rightKey) {
            n.lkey = n.lkey + skewEdit;
          } else {
            if (n.lkey > rightKey) {
              n.lkey = n.lkey - skewTree;
            }
          }
          if (n.rkey <= rightKey) {
            n.depth = n.depth + skewLevel;
          }
          if (n.rkey <= rightKey) {
            n.rkey = n.rkey + skewEdit;
          } else {
            if (n.rkey <= rightKeyNear) {
              n.rkey = n.rkey - skewTree;
            }
          }
        }

        return n;
      });
    } else {
      skewEdit = rightKeyNear - leftKey + 1;
      this.Structure = this.Structure.map((n) => {
        if (n.rkey > rightKeyNear && n.lkey < rightKey) {
          if (n.lkey >= leftKey) {
            n.rkey = n.rkey + skewEdit;
          } else {
            if (n.rkey < leftKey) {
              n.rkey = n.rkey + skewTree;
            }
          }
          if (n.lkey >= leftKey) {
            n.depth = n.depth + skewLevel;
          }
          if (n.lkey >= leftKey) {
            n.lkey = n.lkey + skewEdit;
          } else {
            if (n.lkey > rightKeyNear) {
              n.lkey = n.lkey + skewTree;
            }
          }
        }

        return n;
      });
    }
  };

  getNodes = () => this.Structure.sort((a, b) => a.lkey - b.lkey);

  removeNodes = () => {
    this.Structure = [];
  };

  getParent = (nodeId) => {
    var parents = this.getParents(nodeId);
    return parents[parents.length - 1] === undefined
      ? false
      : parents[parents.length - 1];
  };

  getParents = (nodeId) => {
    var parentNode = this.getNode(nodeId, true);
    if (!parentNode) {
      return [];
    } else {
      return this.getNodes()
        .filter(
          (n) => n.lkey < parentNode.lkey && n.rkey > parentNode.rkey,
        )
        .map((n) => {
          n.data = this.Data[n.itemId];
          return n;
        });
    }
  };

  getChilds = (nodeId, depth) => {
    var parentNode = this.getNode(nodeId, true);
    if (!parentNode) {
      return [];
    } else {
      return this.getNodes()
        .filter(
          (n) =>
            n.lkey >= parentNode.lkey &&
            n.rkey <= parentNode.rkey &&
            nodeId !== n._id &&
            (depth === undefined
              ? true
              : n.depth <= parentNode.depth + depth),
        )
        .map((n) => {
          n.data = this.Data[n.itemId];
          return n;
        });
    }
  };

  getBranch = (nodeId) => {
    var parentNode = this.getNode(nodeId);
    if (!parentNode) {
      return [];
    } else {
      return this.getNodes()
        .filter(
          (n) => n.rkey > parentNode.lkey && n.lkey < parentNode.rkey,
        )
        .map((n) => {
          n.data = this.Data[n.itemId];
          return n;
        });
    }
  };

  getTree = () =>
    this.getNodes().map((n) => {
      n.data = this.Data[n.itemId];
      return n;
    });

  clearAll = () => {
    this.Structure = [];
    this.Data = {};
  };

  isRoot = (nodeId) => {
    var selectedNode = this.getNode(nodeId);
    return selectedNode && selectedNode.parentId === 0;
  };

  isBranch = (nodeId) => {
    var selectedNode = this.getNode(nodeId);
    return selectedNode && selectedNode.childs > 0;
  };

  isLeaf = (nodeId) => {
    var selectedNode = this.getNode(nodeId);
    return selectedNode && selectedNode.childs === 0;
  };

  getMaxRightKey = () =>
    this.Structure.reduce(
      (a, { rkey }) => (a > rkey ? a : rkey),
      -Infinity,
    );

  getMaxLeftKey = () =>
    this.Structure.reduce(
      (a, { lkey }) => (a > lkey ? a : lkey),
      -Infinity,
    );

  getCountNodes = () => this.Structure.length;

  checkTree = () => {
    var ruleLeftLessRight = this.Structure.filter(
      (n) => n.lkey >= n.rkey,
    );
    var ruleModKeys = this.Structure.filter(
      (n) => (n.rkey - n.lkey) % 2 === 0,
    );
    var ruleDepth = this.Structure.filter(
      (n) => (n.lkey - n.depth + 2) % 2 === 1,
    );

    var errors = [];

    if (ruleLeftLessRight.length !== 0) {
      errors.push({
        LeftLessRight: ruleLeftLessRight,
      });
    }
    if (ruleModKeys.length !== 0) {
      errors.push({
        ModKeys: ruleModKeys,
      });
    }
    if (ruleDepth.length !== 0) {
      errors.push({
        Depth: ruleDepth,
      });
    }

    return errors;
  };

  debug = () =>
    this.getNodes()
      .map(
        (n) =>
          `${String(' ').repeat(n.depth + 1)}> ${JSON.stringify(
            this.Data[n.itemId],
          )}(itemId:${n.itemId}; nodeId:${n._id}; lkey:${
            n.lkey
          }; rkey:${n.rkey}; depth:${n.depth}; childs:${n.childs})`,
      )
      .join('\n');
}

export default NestedSet;
