import sha256 from "crypto-js/sha256.js";
import Block from "./block.js";

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
    let self = this;
    for (let i = 0; i < self.chain.length; i++) {
      let block = self.chain[i];
      try {
        let isValid = await block.validate();
        if (!isValid) {
          errors.push(`Block ${block.height} is not valid`);
        }
      } catch (error) {
        errors.push(error);
      }
    }
    return errors;
  }

  print() {
    let self = this;
    for (let block of self.chain) {
      console.log(block.toString());
    }
  }
}

export default Blockchain;
