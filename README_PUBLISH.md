# How to Publish Orlim Contract to Testnet

## Problem
If you see the error: "Package object does not exist with ID 0x249d73c95dd51ff7ce4dc4a02030b21011bf234242ad7ba2c4a38fc09b97663a", it means the contract needs to be published to testnet.

## Solution

### Option 1: Publish Contract to Testnet

1. **Navigate to the contract directory:**
   ```bash
   cd orlim
   ```

2. **Build the contract:**
   ```bash
   sui move build
   ```

3. **Publish to testnet:**
   ```bash
   sui client publish --gas-budget 100000000
   ```

4. **Copy the new Package ID** from the output and update `frontend/src/constants/contracts.ts`:
   ```typescript
   PACKAGE_ID: '0x[YOUR_NEW_PACKAGE_ID]',
   ```

### Option 2: Use Existing Package on Different Network

If the package exists on a different network (mainnet/devnet), you can:

1. **Check Sui Explorer:**
   - Testnet: https://suiexplorer.com/object/0x249d73c95dd51ff7ce4dc4a02030b21011bf234242ad7ba2c4a38fc09b97663a?network=testnet
   - Mainnet: https://suiexplorer.com/object/0x249d73c95dd51ff7ce4dc4a02030b21011bf234242ad7ba2c4a38fc09b97663a?network=mainnet
   - Devnet: https://suiexplorer.com/object/0x249d73c95dd51ff7ce4dc4a02030b21011bf234242ad7ba2c4a38fc09b97663a?network=devnet

2. **Update frontend to use the correct network** in `frontend/src/main.tsx`:
   ```typescript
   <SuiClientProvider networks={networkConfig} defaultNetwork="mainnet"> // or "devnet"
   ```

## Verification

After publishing, verify the package exists:
```bash
sui client object 0x[PACKAGE_ID]
```

The package should show as "Immutable" type.

