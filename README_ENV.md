# Environment Variables Setup

This project uses environment variables for configuration. Follow these steps to set up your local environment.

## Quick Setup

1. **Copy the example file:**
   ```bash
   cp .env.example .env.local
   ```

2. **Edit `.env.local` and add your API keys:**
   ```env
   COINGECKO_API_KEY=your_actual_api_key_here
   ```
   
   **Note:** If you're using Vite, you can also use `VITE_COINGECKO_API_KEY` (with prefix) for compatibility. The config will automatically detect either format.

3. **Restart the dev server** if it's running:
   ```bash
   npm run dev
   ```

## Environment Variables

### Required Variables

- `COINGECKO_API_KEY`: Your CoinGecko API key
  - Get it from: https://www.coingecko.com/en/api
  - Free tier: 10-50 calls/minute
  - Example: `CG-t9oeaaQZkxzjLHMDidfReygB`
  - **Alternative:** You can also use `VITE_COINGECKO_API_KEY` (with VITE_ prefix) for Vite compatibility

### Optional Variables

- `VITE_DEEPBOOK_INDEXER_API`: DeepBook Indexer API URL
  - Default: `https://deepbook-indexer.testnet.mystenlabs.com`
  - Only change if using a different endpoint

- `DEFAULT_SUI_PRICE`: Fallback SUI price if API fails
  - Default: `2.0`
  - Used when CoinGecko API is unavailable
  - **Alternative:** You can also use `VITE_DEFAULT_SUI_PRICE` (with VITE_ prefix) for Vite compatibility

## File Structure

- `.env.example`: Template file (committed to git)
- `.env.local`: Your local configuration (NOT committed to git)
- `.gitignore`: Already configured to ignore `.env.local`

## Security Notes

⚠️ **Never commit `.env.local` to git!**

The `.env.local` file contains sensitive API keys and is already in `.gitignore`. Always use `.env.example` as a template for documentation.

## Environment Variable Naming

The project uses a config file (`src/config/coingecko.ts`) that automatically detects environment variables with or without the `VITE_` prefix:

- **Preferred:** `COINGECKO_API_KEY` (without prefix)
- **Alternative:** `VITE_COINGECKO_API_KEY` (with prefix, for Vite compatibility)

**Note:** If you're using Vite and want to expose variables to client-side, you still need the `VITE_` prefix in your `.env` file. However, the config file abstracts this complexity and supports both formats.

## Troubleshooting

If environment variables aren't working:

1. **For Vite:** Use `VITE_COINGECKO_API_KEY` in your `.env.local` file
2. **For other build tools:** Use `COINGECKO_API_KEY` (the config will detect it)
3. Restart the dev server after changing `.env.local`
4. Check that `.env.local` is in the `frontend/` directory
5. Verify the variable is being read: Check the browser console or use `console.log(import.meta.env.COINGECKO_API_KEY)` or `console.log(import.meta.env.VITE_COINGECKO_API_KEY)`

