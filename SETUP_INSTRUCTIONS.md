# Setup Instructions for ASS

## You're currently in the `ass` folder - Good! ✅

## Step 1: Install UV Package Manager

UV is a fast Python package manager. Install it using Homebrew:

```bash
brew install uv
```

This will take a minute or two.

## Step 2: Install Dependencies

Once UV is installed, run:

```bash
uv sync
```

This installs all required packages (anthropic, openai, rich, etc.)

## Step 3: Run Your First Debate!

```bash
uv run python debate_app.py
```

---

## Alternative: Use Python Directly (Without UV)

If you prefer not to install UV, you can use regular Python:

### Install dependencies with pip:
```bash
pip3 install anthropic openai python-dotenv rich requests pydantic
```

### Run the debate:
```bash
python3 debate_app.py
```

---

## Quick Commands Summary

**With UV (Recommended):**
```bash
# 1. Install UV
brew install uv

# 2. Install dependencies
uv sync

# 3. Run debate
uv run python debate_app.py
```

**With Python directly:**
```bash
# 1. Install dependencies
pip3 install anthropic openai python-dotenv rich requests pydantic

# 2. Run debate
python3 debate_app.py
```

---

## Troubleshooting

### If `brew install uv` fails:
Update Homebrew first:
```bash
brew update
brew install uv
```

### If you get permission errors with pip:
Use the `--user` flag:
```bash
pip3 install --user anthropic openai python-dotenv rich requests pydantic
```

### To verify UV is installed:
```bash
uv --version
```

---

## What's Next?

Once setup is complete, you'll be able to:
1. Ask any question
2. Watch 4 AI personalities debate
3. See them vote and reach consensus
4. Get a final judge decision
5. Review saved debates in the `debates/` folder

**Your API keys are already configured in `.env` - you're ready to go!** 🚀
