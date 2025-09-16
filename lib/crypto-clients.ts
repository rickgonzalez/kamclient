import { ethers, AbiCoder, keccak256 } from 'ethers'
import { arrayify } from "@ethersproject/bytes";

export class KamiozaCrypto {
  private wallet: ethers.Wallet | ethers.HDNodeWallet | null = null
  
  // Generate or load device keypair
  async initializeDeviceWallet(): Promise<string> {
    // Check if device already has a wallet
    const storedPrivateKey = localStorage.getItem('kamioza_device_key')
    
    if (storedPrivateKey) {
      this.wallet = new ethers.Wallet(storedPrivateKey)
    } else {
      // Generate new wallet for this device
      this.wallet = ethers.Wallet.createRandom()
      if (this.wallet) {
        localStorage.setItem('kamioza_device_key', this.wallet.privateKey)
      }
    }
    
    return this.wallet.address
  }
  
  // Sign item purchase transaction for Guy's server
  async signPurchaseTransaction(itemData: {
    itemId: string
    price: number
    playerAddress: string
  }): Promise<string> {
    if (!this.wallet) {
      throw new Error('Wallet not initialized')
    }
    
    // Create the same transaction hash that Guy's server expects
    const abiCoder = new AbiCoder()
    const transactionData = abiCoder.encode(
      ['string', 'uint256', 'address'],
      [itemData.itemId, itemData.price, itemData.playerAddress]
    )
    const transactionHash = keccak256(transactionData)
    
    // Sign the hash
    return await this.wallet.signMessage(arrayify(transactionHash))
  }
  
  // Sign general game transactions for blockchain
  async signGameTransaction(transactionData: any): Promise<string> {
    if (!this.wallet) {
      throw new Error('Wallet not initialized')
    }
    
    const dataString = JSON.stringify(transactionData)
    return await this.wallet.signMessage(dataString)
  }
  
  getAddress(): string {
    return this.wallet?.address || ''
  }
}

// Singleton instance
export const kamiozaCrypto = new KamiozaCrypto()