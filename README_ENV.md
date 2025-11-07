# Environment Variables Setup

This project uses environment variables for configuration. Follow these steps to set up your local environment.

## Quick Setup

1. **Copy the example file:**
   ```bash
   cp .env.example .env.local
   ```

2. **Edit `.env.local` and add your API keys:**
   ```env
   VITE_COINGECKO_API_KEY=your_actual_api_key_here
   ```

3. **Restart the dev server** if it's running:
   ```bash
   npm run dev
   ```

## Environment Variables

### Required Variables

- `VITE_COINGECKO_API_KEY`: Your CoinGecko API key
  - Get it from: https://www.coingecko.com/en/api
  - Free tier: 10-50 calls/minute
  - Example: `CG-t9oeaaQZkxzjLHMDidfReygB`

### Optional Variables

- `VITE_DEEPBOOK_INDEXER_API`: DeepBook Indexer API URL
  - Default: `https://deepbook-indexer.testnet.mystenlabs.com`
  - Only change if using a different endpoint

- `VITE_DEFAULT_SUI_PRICE`: Fallback SUI price if API fails
  - Default: `2.0`
  - Used when CoinGecko API is unavailable

## File Structure

- `.env.example`: Template file (committed to git)
- `.env.local`: Your local configuration (NOT committed to git)
- `.gitignore`: Already configured to ignore `.env.local`

## Security Notes

⚠️ **Never commit `.env.local` to git!**

The `.env.local` file contains sensitive API keys and is already in `.gitignore`. Always use `.env.example` as a template for documentation.

## Vite Environment Variables

All environment variables must be prefixed with `VITE_` to be exposed to the client-side code. This is a Vite requirement.

## Troubleshooting

If environment variables aren't working:

1. Make sure the variable name starts with `VITE_`
2. Restart the dev server after changing `.env.local`
3. Check that `.env.local` is in the `frontend/` directory
4. Verify the variable is being read: `console.log(import.meta.env.VITE_COINGECKO_API_KEY)`

