import Block from "./block";

class Blockchain {
  constructor() {
    this.chain = [];
    this.height = -1;
    this.initializeChain();
  }

  async initializeChain() {
    if (this.height === -1) {
      const block = new Block({ data: "Genesis Block" });
      await this.addBlock(block);
    }
  }
  addBlock(block) {
    let self = this;
    return new Promise((resolve, reject) => {
      block.height = self.chain.length;
      block.time = new Date().getTime().toString();
      if (self.chain.length > 0) {
        block.previousBlockHash = self.chain[self.chain.length - 1].hash;
      }
    });
  }
}

module.exports = Blockchain;
