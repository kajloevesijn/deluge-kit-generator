export const RandomWords = () => {
    const adjectives = [
        // Astronomy
        'Stellar', 'Galactic', 'Cosmic', 'Celestial', 'Infinite', 'Astral', 'Orbital', 'Solar', 'Lunar', 'Starlit', 'Interplanetary', 'Ethereal', 'Cometary', 'Sidereal', 'Nebulous', 'Antimaterial', 'Eclipsing',
        
        // Sci-fi
        'Futuristic', 'Alien', 'Interstellar', 'Extraterrestrial', 'Holographic', 'Quantum', 'Mechanical', 'Hyperspatial', 'Plasmatic', 'Cryptographic', 'Metahuman', 'Gravitational', 'Morphing', 'Dimensional',
        
        // Synthesizers
        'Harmonic', 'Resonant', 'Modulated', 'Filtered', 'Squelchy', 'Echoing', 'Phonic', 'Overdriven', 'Distorted', 'Reverberating',
        
        // Cyberpunk
        'Neon', 'Dystopian', 'Cybernetic', 'Virtual', 'Augmented', 'Synthetic', 'Artificial', 'Cracked', 'Glitched', 'Chromed', 'Stealthy', 'Transhuman', 
        
        // Street racing
        'Aerodynamic', 'Nitrous', 'Turbocharged', 'High-octane', 'Supercharged', 'Aerodynamic', 'Rapid', 'Streamlined', 'Torqued', 'Nitro', 'Throttle', 'Shift', 'Overdrive', 'Power', 'Fuel-injected', 'Overtaken',
        
        // General adjectives that could fit in various categories
        'Radioactive', 'Pulsing',
        'Illuminated', 'Metallic', 'Gritty', 'Saturated', 'Neural', 'Flickering', 'Underground',
        'Piercing', 'Searing', 'Rumbling', 'Kaleidoscopic', 'Spectral', 'Prismatic', 'Infrasonic', 'Turbulent',
        'Phosphorescent', 'Nacreous', 'Opalescent', 'Incandescent', 'Psychedelic', 'Hallucinogenic', 'Parallax', 'Hyperreal'
    ];

    const nouns = [
        // Astronomy
        'Constellation', 'Nebula', 'Galaxy', 'Quasar', 'Pulsar', 'Supernova', 'Eclipse', 'Meteor', 'Orbit', 'Blackhole', 'Satellite', 'Comet', 'Starlight', 'Telescope', 'Astrolabe', 'Stargazer', 'Planisphere', 'Asterism', 'Apogee', 'Zenith',
    
        // Sci-fi
        'Robot', 'Spacecraft', 'Alien', 'Laser', 'Cyborg', 'Time-Machine', 'Teleporter', 'Portal', 'Clone', 'Android', 'Spacesuit', 'Stargate', 'Holodeck', 'Nanobot', 'Paraspace', 'Mutant', 'Spaceship', 'Galaxy', 'Dimension', 'Replicator', 'Nanotech',
    
        // Synthesizers
        'Sequencer', 'Oscillator', 'Keyboard', 'Drum-Machine', 'Sampler', 'Workstation', 'Modulator', 'Arpeggiator', 'Synth', 'Controller',  'Waveform', 'Resonance', 'Envelope', 'Filter', 'LFO', 'Vocoder', 'Equalizer', 'Amplifier', 'Reverb', 'Pitchbend',
    
        // Cyberpunk
        'Dystopia', 'Matrix', 'Mainframe', 'Megacity', 'Cyberspace', 'Augmentation', 'Replicant', 'Hacker', 'Netrunner', 'Console', 'Cyberdeck', 'Codebreaker', 'Dataspace', 'Firewall', 'Netizen', 'Overclock', 'Rootkit', 'Trojan', 'Biotech','Megacorp', 'Psycho', 'Syndicate',
    
        // Street racing
        'Turbo', 'Nitro', 'Drift', 'Engine', 'Traction', 'Gearshift', 'Torque', 'Clutch', 'Hydraulic', 'Redline', 'Supercharger',
    
        // General nouns that could fit in various categories
        'Pulse', 'Flare', 'Echo', 'Energy', 'Wave', 'Photon', 'Spectrum', 'Chaos',
        'Fusion', 'Fractal', 'Vortex', 'Illusion', 'Polarity', 'Hyperspace', 'Algorithm', 'Paradox', 'Anomaly', 'Reverberation',
        'Flash', 'Pulse', 'Shift', 'Charge', 'Cycle', 'Phase', 'Rhythm', 'Swirl', 'Radiance', 'Vortex',
        'Blitz', 'Glow', 'Haze', 'Jet', 'Quake', 'Ripple', 'Surge', 'Twist', 'Vibe', 'Whirl', 'Horror', 'Mutants'
    ];

    function generateRandomPhrase() {
        const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
        return `${randomAdjective} ${randomNoun}`;
    }

  return generateRandomPhrase;
}
