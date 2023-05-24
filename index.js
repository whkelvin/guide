const tree0 = {
  name: "0",
  children: [
    {
      name: "node 0-0",
      children: [
        {
          name: "node 0-0-0",
          children: null,
        },
        {
          name: "node 0-0-1",
          children: null,
        },
      ],
    },
    {
      name: "node 0-1",
      children: null,
    },
  ],
};

const tree1 = {
  name: "1",
  children: [
    {
      name: "node 1-0",
      children: null,
    },
    {
      name: "node 1-1",
      children: null,
    },
  ],
};

const trees = [tree0, tree1];
let i = null;
let j = null;
let k = null;

function printNode(i, j, k) {
  if (j == null) {
    if (!trees[i]?.name) {
      console.log(
        `${i ?? ""}${j == null ? "" : "-" + j}${k == null ? "" : "-" + k
        } does not exist`
      );
      return;
    }

    console.log(trees[i].name);
    return;
  }

  if (k == null) {
    if (!trees[i]?.children[j]?.name) {
      console.log(
        `${i ?? ""}${j == null ? "" : "-" + j}${k == null ? "" : "-" + k
        } does not exist`
      );
      return;
    }
    console.log(trees[i].children[j].name);
    return;
  }

  if (!trees[i]?.children[j]?.children[k]) {
    console.log(
      `${i ?? ""}${j == null ? "" : "-" + j}${k == null ? "" : "-" + k
      } does not exist`
    );
    return;
  }
  n = trees[i].children[j].children[k];
  console.log(n.name);
  return;
}

//n-n-n should return 0-n-n
//0-n-n should return 1-n-n
//0-0-n should return 0-1-n
//0-1-1 shoudl return 0-1-2
function next(i, j, k) {
  if (k != null) {
    return { i: i, j: j, k: k + 1 };
  }
  if (j != null) {
    return { i: i, j: j + 1, k: k };
  }
  if (i != null) {
    return { i: i + 1, j: j, k: k };
  }
  return { i: 0, j: null, k: null };
}

//n-n-n should return n-n-n
//0-n-n should return 0-n-n
//0-0-n should return 0-0-n
//0-0-0 should return 0-0-0
//0-1-n shoudl return 0-0-n
function prev(i, j, k) {
  if (k != null) {
    return { i: i, j: j, k: k - 1 };
  }
  if (j != null) {
    return { i: i, j: j - 1, k: k };
  }
  if (i != null) {
    return { i: i - 1, j: j, k: k };
  }
  return { i: null, j: null, k: null };
}

function back(i, j, k) {
  if (k != null) {
    return { i: i, j: j, k: null };
  }
  if (j != null) {
    return { i: i, j: null, k: null };
  }
  if (i != null) {
    return { i: null, j: null, k: null };
  }
}

function select(i, j, k) {
  if (i == null) {
    return { i: 0, j: j, k: k };
  }
  if (j == null) {
    return { i: i, j: 0, k: k };
  }
  if (k == null) {
    return { i: i, j: j, k: 0 };
  } else {
    return { i: i, j: j, k: k };
  }
}

function setCurrentNode() {
  let ele = window.document.getElementById("currentNode");
  ele.innerHTML = `Node ${i ?? ""}${j == null ? "" : "-" + j}${k == null ? "" : "-" + k
    }`;
}

function isOutOfRange(i, j, k) {
  try {
    if (i != null) {
      const res = trees[i];
      if (res == null || res == undefined) return true;
    }

    if (j != null) {
      const res = trees[i]?.children[j];
      if (res == null || res == undefined) return true;
    }

    if (k != null) {
      const res = trees[i]?.children[j]?.children[k];
      if (res == null || res == undefined) return true;
    }

    if (i != null) {
      if (i < 0 || i > trees.length - 1) {
        return true;
      }
    }
    if (j != null) {
      if (j < 0 || j > trees[i].children.length - 1) {
        return true;
      }
    }
    if (k != null) {
      if (k < 0 || k > trees[i].children[j].children.length - 1) {
        return true;
      }
    }
  } catch (error) {
    return true;
  }

  return false;
}

function onNextClicked() {
  speak("next is clicked");
  const res = next(i, j, k);
  if (!isOutOfRange(res.i, res.j, res.k)) {
    i = res.i;
    j = res.j;
    k = res.k;
    setCurrentNode();
    speakCurrentNode();
  } else {
    speakOutOfRange();
  }
}

function onPrevClicked() {
  speak("previous is clicked");
  const res = prev(i, j, k);
  if (!isOutOfRange(res.i, res.j, res.k)) {
    i = res.i;
    j = res.j;
    k = res.k;
    setCurrentNode();
    speakCurrentNode();
  } else {
    speakOutOfRange();
  }
}

function onSelectClicked() {
  speak("select is clicked");
  const res = select(i, j, k);
  if (!isOutOfRange(res.i, res.j, res.k)) {
    i = res.i;
    j = res.j;
    k = res.k;
    setCurrentNode();
    speakCurrentNode();
  } else {
    speakOutOfRange();
  }
}

function onBackClicked() {
  speak("back is clicked");
  const res = back(i, j, k);
  if (!isOutOfRange(res.i, res.j, res.k)) {
    i = res.i;
    j = res.j;
    k = res.k;
    setCurrentNode();
    speakCurrentNode();
  } else {
    speakOutOfRange();
  }
}

function speakCurrentNode() {
  if (i == null) {
    var msg = new SpeechSynthesisUtterance(`Current Node is unset`);
    window.speechSynthesis.speak(msg);
  } else {
    var msg = new SpeechSynthesisUtterance(
      `Current Node is ${i ?? ""}${j == null ? "" : "dash " + j}${k == null ? "" : "dash" + k
      }`
    );
    window.speechSynthesis.speak(msg);
  }
}

function speakOutOfRange() {
  var msg = new SpeechSynthesisUtterance(`Out of Range`);
  window.speechSynthesis.speak(msg);
}

function speak(msg) {
  var msg = new SpeechSynthesisUtterance(msg);
  window.speechSynthesis.speak(msg);
}
