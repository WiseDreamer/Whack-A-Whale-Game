Whack A Whale
=============

A tiny browser game: moles (whales) pop up randomly and you click them before they disappear.

Files
- `index.html` - game markup and controls
- `style.css` - layout and animations
- `script.js` - game logic (pop timing, scoring, difficulty)

How to run
1. Open `index.html` directly in a browser, or serve the folder with a simple server.

Quick local server (recommended to avoid some browser restrictions):

```powershell
# from the project folder
python -m http.server 8000
# then open http://localhost:8000
```

Gameplay
- Choose difficulty and press Start.
- Click whales (🐳) to score before they disappear.
- Game lasts 30 seconds.

Notes / Next steps
- Add sounds, high-score persistence (localStorage), and mobile touch optimizations.
- Could add levels, power-ups, or animated backgrounds for polish.
