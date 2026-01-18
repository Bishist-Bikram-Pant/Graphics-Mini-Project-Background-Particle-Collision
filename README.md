# Graphics Mini Project: Background Particle Collision

A computer graphics mini project that simulates particle collision physics with animated background rendering. This project demonstrates fundamental concepts in computer graphics including particle systems, collision detection, physics simulation, and real-time rendering.

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [How to Run](#how-to-run)
- [Project Structure](#project-structure)
- [Technical Details](#technical-details)
- [Controls](#controls)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## 🎯 About the Project

This project implements a particle collision simulation system with a dynamic background. The simulation demonstrates:

- **Particle Physics**: Realistic particle movement with velocity and acceleration
- **Collision Detection**: Efficient algorithms to detect particle-to-particle and particle-to-boundary collisions
- **Collision Response**: Physically accurate collision responses using elastic collision formulas
- **Background Rendering**: Animated or static background that enhances visual appeal
- **Real-time Performance**: Optimized rendering for smooth animation

The project is built using computer graphics libraries and provides an interactive visualization of classical mechanics principles.

## ✨ Features

- ⚡ Real-time particle simulation with configurable parameters
- 🎨 Customizable particle colors, sizes, and quantities
- 💥 Elastic collision physics between particles
- 🖼️ Dynamic background rendering
- 🎮 Interactive controls for simulation parameters
- 📊 Performance optimization for handling multiple particles
- 🔄 Boundary collision detection and response
- 🎭 Visual effects and animations

## 📦 Prerequisites

Before running this project, ensure you have the following installed:

### For C/C++ Implementation:
- **Compiler**: GCC/G++ (MinGW for Windows) or any C/C++ compiler
- **Graphics Library**: 
  - OpenGL with GLUT/FreeGLUT, or
  - SDL2, or
  - Graphics.h (for BGI-based implementations)
- **Build Tools**: Make (optional, for Makefile-based builds)

### For other implementations:
- **Python**: Python 3.x with Pygame/Pyglet library
- **JavaScript**: Modern web browser (Chrome, Firefox, Safari)
- **Java**: JDK 8 or higher with JavaFX or AWT

## 🚀 Installation

### Clone the Repository

```bash
git clone https://github.com/Bishist-Bikram-Pant/Graphics-Mini-Project-Background-Particle-Collision.git
cd Graphics-Mini-Project-Background-Particle-Collision
```

### For C/C++ with OpenGL/GLUT:

#### On Linux:
```bash
# Install GLUT library
sudo apt-get update
sudo apt-get install freeglut3-dev

# Compile the project
g++ -o particle_collision main.cpp -lGL -lGLU -lglut
```

#### On Windows (MinGW):
```bash
# Install MinGW and GLUT library first
g++ -o particle_collision.exe main.cpp -lfreeglut -lopengl32 -lglu32
```

#### On macOS:
```bash
# GLUT comes pre-installed on macOS
g++ -o particle_collision main.cpp -framework OpenGL -framework GLUT
```

### For C/C++ with Graphics.h (BGI):

#### On Linux with SDL_bgi:
```bash
# Install SDL_bgi library
sudo apt-get install libsdl2-dev libsdl2-gfx-dev
git clone https://github.com/SDL-bgi/SDL_bgi.git
cd SDL_bgi
./configure
make
sudo make install

# Compile
g++ -o particle_collision main.cpp -lSDL2 -lSDL_bgi
```

#### On Windows:
```bash
# Use WinBGIm library with MinGW
g++ -o particle_collision.exe main.cpp -lgraph -lbgi -lgdi32 -lcomdlg32 -luuid -loleaut32 -lole32
```

### For Python with Pygame:
```bash
# Install Pygame
pip install pygame

# No compilation needed - ready to run
```

### For JavaScript:
```bash
# No installation needed - open HTML file in browser
# Or use a local server for better performance:
python -m http.server 8000
# Then open http://localhost:8000 in browser
```

## 🎮 How to Run

### For Compiled C/C++ Programs:

```bash
# Run the executable
./particle_collision          # Linux/macOS
particle_collision.exe        # Windows
```

### For Python:
```bash
python main.py
# or
python3 main.py
```

### For JavaScript:
```bash
# Simply open the index.html file in a web browser
# Or use a local server:
python -m http.server 8000
# Navigate to http://localhost:8000
```

### For Java:
```bash
javac ParticleCollision.java
java ParticleCollision
```

## 📁 Project Structure

```
Graphics-Mini-Project-Background-Particle-Collision/
│
├── README.md                 # This file
├── main.cpp                  # Main source file (C++)
│   # OR
├── main.py                   # Main source file (Python)
│   # OR
├── index.html                # Main HTML file (JavaScript)
├── script.js                 # JavaScript logic
├── style.css                 # Styling
│
├── src/                      # Source code directory (if organized)
│   ├── particle.cpp/.py      # Particle class implementation
│   ├── collision.cpp/.py     # Collision detection and response
│   ├── renderer.cpp/.py      # Rendering logic
│   └── background.cpp/.py    # Background rendering
│
├── include/                  # Header files (for C++)
│   ├── particle.h
│   ├── collision.h
│   └── renderer.h
│
├── assets/                   # Assets directory
│   ├── images/               # Background images
│   └── textures/             # Textures for particles
│
├── docs/                     # Documentation
│   └── algorithm.md          # Algorithm documentation
│
└── Makefile                  # Build configuration (optional)
```

## 🔧 Technical Details

### Algorithms Used:

1. **Collision Detection**:
   - Circle-Circle collision using distance formula
   - Boundary collision using position checks
   - Spatial partitioning for optimization (optional)

2. **Collision Response**:
   - Elastic collision formulas
   - Conservation of momentum and energy
   - Velocity vector calculations

3. **Rendering**:
   - Double buffering for smooth animation
   - Frame-rate independent physics
   - Efficient drawing algorithms

### Physics Formulas:

**Elastic Collision (1D)**:
```
v1' = ((m1 - m2) * v1 + 2 * m2 * v2) / (m1 + m2)
v2' = ((m2 - m1) * v2 + 2 * m1 * v1) / (m1 + m2)
```

**Elastic Collision (2D)**:
```
v1' = v1 - (2*m2/(m1+m2)) * ((v1-v2)·(x1-x2))/(|x1-x2|²) * (x1-x2)
v2' = v2 - (2*m1/(m1+m2)) * ((v2-v1)·(x2-x1))/(|x2-x1|²) * (x2-x1)
```

### Configuration:

Modify these parameters in the source code to customize the simulation:

- `NUM_PARTICLES`: Number of particles in the simulation
- `PARTICLE_RADIUS`: Size of each particle
- `WINDOW_WIDTH`, `WINDOW_HEIGHT`: Simulation window dimensions
- `GRAVITY`: Enable/disable gravity effect
- `FRICTION`: Air resistance coefficient
- `ELASTICITY`: Bounciness of collisions (0-1)

## 🎮 Controls

(These controls may vary based on implementation)

- **Space**: Pause/Resume simulation
- **R**: Reset simulation
- **+/-**: Increase/decrease number of particles
- **Arrow Keys**: Apply force in direction
- **Mouse Click**: Add particle at cursor position
- **ESC**: Exit application

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Ideas for Contributions:
- Add gravity simulation
- Implement particle trails
- Add different particle shapes
- Create particle spawning patterns
- Implement particle merging/splitting
- Add sound effects
- Optimize collision detection with quadtree
- Add GUI controls for parameters

## 📄 License

This project is distributed under the MIT License. See `LICENSE` file for more information.

## 📧 Contact

**Bishist Bikram Pant**

- GitHub: [@Bishist-Bikram-Pant](https://github.com/Bishist-Bikram-Pant)
- Project Link: [https://github.com/Bishist-Bikram-Pant/Graphics-Mini-Project-Background-Particle-Collision](https://github.com/Bishist-Bikram-Pant/Graphics-Mini-Project-Background-Particle-Collision)

## 🙏 Acknowledgments

- Computer Graphics course materials
- OpenGL/GLUT documentation
- Physics simulation tutorials
- Open source graphics community

---

⭐ If you found this project helpful, please give it a star!

**Note**: This is an educational project created as part of a Computer Graphics mini-project. Feel free to use it for learning purposes and expand upon it!