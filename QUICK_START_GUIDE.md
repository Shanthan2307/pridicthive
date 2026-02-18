# Quick Start Guide - ASS Debate System

## ✅ Setup Complete!

Your API keys have been integrated into the `ass/.env` file. The system is ready to run!

## 🚀 Running Your First Debate

### Option 1: Interactive Mode (Recommended)
Ask any question and watch AI personalities debate:

```bash
cd ass
uv run python debate_app.py
```

When prompted, enter a question like:
- "Should we develop AGI as fast as possible?"
- "Is pineapple on pizza acceptable?"
- "Should social media be regulated?"
- "Is remote work better than office work?"

### Option 2: Demo Mode
Run a pre-configured debate:

```bash
cd ass
uv run python demo.py
```

## 🎮 Command Options

### Voting Mode (Default)
Debates continue until AI personalities reach consensus through voting:
```bash
cd ass
uv run python debate_app.py
```

### Classic Mode (3 Rounds)
Fixed 3-round debate format:
```bash
cd ass
uv run python debate_app.py --classic-mode
```

### Custom Configuration
```bash
# Higher consensus threshold (90%)
uv run python debate_app.py --voting-threshold 0.9

# More iterations allowed
uv run python debate_app.py --max-iterations 15

# Disable automatic saving
uv run python debate_app.py --no-save
```

## 📊 What Happens During a Debate

1. **You ask a question**
2. **Iteration 0**: Each AI presents their initial position
3. **Iteration 1+**: AIs argue and directly engage with each other's points
4. **Voting Phase**: After each iteration, AIs rank all participants
5. **Consensus Check**: Continue until 75% agreement is reached
6. **Judge Review**: Impartial judge synthesizes all perspectives
7. **Auto-Save**: Complete debate saved to `debates/` folder

## 🎭 Meet Your Debaters

- **🌟 Claude Optimist** - Creative, sees possibilities everywhere
- **🔍 Claude Skeptic** - Analytical, points out flaws and risks
- **🚀 GPT Visionary** - Forward-thinking, champions bold ideas
- **⚖️ GPT Critic** - Methodical, highlights potential issues

## 📁 Saved Debates

All debates are automatically saved to:
```
ass/debates/YYYYMMDD_HHMMSS_Title.json
```

Each file contains:
- Complete debate history
- All arguments and votes
- Judge's final decision
- Configuration used

## 🔧 Troubleshooting

### If you get API errors:
1. Check your internet connection
2. Verify API keys have sufficient credits
3. Check the `.env` file is in the `ass/` folder

### If dependencies are missing:
```bash
cd ass
uv sync
```

### To see internal belief updates:
```bash
cd ass
export DEBUG_BELIEFS=true
uv run python debate_app.py
```

## 💡 Example Questions to Try

### Philosophy & Ethics
- "Is free will an illusion?"
- "Should we prioritize individual freedom or collective security?"
- "Is artificial consciousness possible?"

### Technology
- "Should we develop AGI as fast as possible?"
- "Is cryptocurrency the future of money?"
- "Should AI art be copyrightable?"

### Society
- "Should social media be regulated like tobacco?"
- "Is remote work better for society than office work?"
- "Should voting be mandatory in democracies?"

### Fun Debates
- "Is a hot dog a sandwich?"
- "Which is superior: cereal or toast for breakfast?"
- "Should we bring back extinct species?"

## 🎯 Next Steps

1. **Run your first debate**: `cd ass && uv run python debate_app.py`
2. **Try different questions**: See how AIs handle various topics
3. **Experiment with modes**: Compare voting vs classic mode
4. **Review saved debates**: Check the `debates/` folder
5. **Customize personalities**: Edit `debate_app.py` to add your own

## 📚 More Information

- Full documentation: `ass/README.md`
- Architecture details: `ASS_ANALYSIS.md`
- Implementation notes: `ass/IMPLEMENTATION_SUMMARY.md`

---

**Ready to start? Run this command:**
```bash
cd ass && uv run python debate_app.py
```

Enjoy watching AI personalities debate! 🎭
