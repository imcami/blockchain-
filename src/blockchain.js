import sha256 from "crypto-js/sha256";
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

  async addBlock(block) {
    block.height = this.chain.length;
    block.time = new Date().getTime().toString();
    if (this.chain.length > 0) {
      block.previousBlockHash = this.chain[this.chain.length - 1].hash;
    }
    let errors = await this.validateChain();
    if (errors.length > 0) {
      throw new Error("Blockchain is not valid", errors);
    }
    block.hash = sha256(JSON.stringify(block)).toString();
    this.chain.push(block);
    return block;
  }

  async validateChain() {
    let errors = [];
    for (let i = 0; i < this.chain.length; i++) {
      let block = this.chain[i];
      if (block.hash !== sha256(JSON.stringify(block)).toString()) {
        errors.push(`Block ${i} hash is invalid`);
      }
      if (i > 0 && block.previousBlockHash !== this.chain[i - 1].hash) {
        errors.push(`Block ${i} previousBlockHash is invalid`);
      }
    }
    return errors;
  }
}

module.exports = Blockchain;
