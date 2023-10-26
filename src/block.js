import sha256 from "crypto-js/sha256";
import hex2ascii from "hex2ascii";

class Block {
  constructor(data) {
    this.hash = "";
    this.height = 0;
    this.body = JSON.stringify(data).toString("hex");
    this.time = 0;
    this.previousBlockHash = "";
  }
  //validar que el bloque no haya sido manipulado ni hackeado

  async validate() {
    const self = this;
    let currentHash = self.hash;
    self.hash = sha256(JSON.stringify({ ...self, hash: null })).toString();

    if (currentHash != self.hash) {
      return false;
    }
    return true;
  }

  async getBlockData() {
    const self = this;
    let encodedData = self.body;
    let decodedData = hex2ascii(encodedData);
    let dataObject = JSON.parse(decodedData);
    if (dataObject === "Genesis Block") {
      reject(new Error("This is the Genesis Block"));
    }
    resolve(dataObject);
  }
  toString() {
    const { hash, height, body, time, previousBlockHash } = this;
    return `Block - 
    hash: ${hash}
    height: ${height}
    body: ${body}
    time: ${time}
    previousBlockHash: ${previousBlockHash}
    ---------------------------------------`;
  }
}

export default Block;
