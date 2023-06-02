export const RandomWords = () => {
    const adjectives = [
        // Astronomy
        'Stellar', 'Galactic', 'Cosmic', 'Celestial', 'Astral', 'Orbital', 'Solar', 'Lunar', 'Starlit', 'Cometary', 'Sidereal', 'Antimaterial',
        'Nebular', 'Ethereal', 'Interstellar', 'Radiant', 'Eclipsed', 'Nuclear', 'Milky', 'Auroral', 'Supernovae',
        
        // Sci-fi
        'Alien', 'Quantum', 'Metahuman', 'Morphing', 'Luminous', 'Nanoscopic', 'Extraterrestrial', 'Cybernetic', 'Technological',
        'Futuristic', 'Synthetic', 'Hyperadvanced', 'Otherworldly', 'Cosmological', 'Dimensional', 'Immersive', 'Artificial', 'Virtual', 'Genetic',
        
        // Synthesizers
        'Harmonic', 'Resonant', 'Modulated', 'Filtered', 'Squelchy', 'Phonic', 'Analog', 'Digital', 'Polyphonic', 'Monophonic',
        'Ambient', 'Subtractive', 'Acidic', 'Experimental', 'Lush', 'Vintage', 'Glitchy', 'Rhythmic', 'Modular', 'Sonic',
        
        // Cyberpunk
        'Neon', 'Cracked', 'Glitched', 'Chromed', 'Stealthy', 'Virtual', 'Augmented', 'Holographic', 'Wireless', 'Invisible',
        'Dystopian', 'Megacorporate', 'Surreal', 'Sleek', 'Shadowy', 'Decrypting', 'Circuitry', 'Subversive', 'Disruptive', 'Rogue',
        
        // Street racing
        'Nitrous', 'Turbocharged', 'Rapid', 'Nitro', 'Shift', 'Power', 'Overtaken', 'Sleek', 'Aerodynamic', 'Adrenaline',
        'Velocity', 'High-speed', 'Tuned', 'Agile', 'Roaring', 'Exhilarating', 'Drifting', 'Pumped', 'Supersonic', 'Streetwise',
        
        // General adjectives that could fit in various categories
        'Metallic', 'Gritty', 'Saturated', 'Neural', 'Underground',
        'Piercing', 'Searing', 'Rumbling', 'Prismatic', 'Turbulent',
        'Nacreous', 'Incandescent', 'Parallax', 'Hyperreal', 'Energetic', 'Transcendent', 'Ethereal', 'Enigmatic', 'Dynamic',
        'Psychedelic', 'Innovative', 'Blazing', 'Vivid', 'Eclectic', 'Magnetic', 'Translucent', 'Intense', 'Uncharted', 'Unleashed',
        
        // Cosmic horror
        'Eldritch', 'Cthulhian', 'Abysmal', 'Maddening', 'Tenebrous', 'Phantasmal', 'Obsidian', 'Abyssal', 'Unspeakable', 'Haunting',
        'Infinite', 'Nihilistic', 'Harrowing', 'Dreadful', 'Wretched', 'Ominous', 'Acherontic', 'Malevolent', 'Spectral', 'Unfathomable',
        
        // Demonic
        'Diabolical', 'Infernal', 'Hellish', 'Satanic', 'Fiery', 'Malefic', 'Demonic', 'Malignant', 'Sinister', 'Blasphemous',
        'Cursed', 'Beastly', 'Vile', 'Devilish', 'Occult', 'Nightmarish', 'Tormented', 'Horrifying', 'Wicked', 'Macabre'
    ];
    
    const nouns = [
        // Astronomy
        'Nebula', 'Galaxy', 'Quasar', 'Pulsar', 'Eclipse', 'Meteor', 'Orbit', 'Blackhole', 'Satellite', 'Comet', 'Telescope', 'Asterism', 'Apogee', 'Zenith',
        'Stardust', 'Celestial', 'Supernova', 'Luminosity', 'Cosmos', 'Constellation', 'Astrology', 'Astrolabe', 'Stargazer', 'Astrophysics', 'Starlight', 'Crescent', 'Horizon', 'Parallax',
        
        // Sci-fi
        'Robot', 'Alien', 'Laser', 'Cyborg', 'Clone', 'Android', 'Spacesuit', 'Holodeck', 'Nanobot', 'Mutant', 'Galaxy', 'Dimension', 'Replicator', 'Nanotech',
        'Exosuit', 'Infiltrator', 'Phaser', 'Quantum', 'Technomancer', 'Virtuality', 'Warp', 'Teleporter', 'Exoplanet', 'Genome', 'Timegate', 'Extraterrestrial', 'Astrogation', 'Hologram', 'Astrozone', 'Nanocircuit',
        
        // Synthesizers
        'Sequencer', 'Oscillator', 'Keyboard', 'Sampler', 'Workstation', 'Modulator', 'Arpeggiator', 'Synth', 'Controller',  'Waveform', 'Resonance', 'Envelope', 'Filter', 'LFO', 'Vocoder', 'Equalizer', 'Reverb',
        'Analog', 'Digital', 'Polyphony', 'Modulation', 'Resonator', 'Sonic', 'Frequency', 'Harmony', 'Rhythm', 'Soundwave', 'Ambience', 'Synesthesia', 'Patch', 'Timbre', 'Beat', 'Pulsewidth',
        
        // Cyberpunk
        'Dystopia', 'Matrix', 'Mainframe', 'Megacity', 'Cyberspace', 'Augmentation', 'Replicant', 'Hacker', 'Console', 'Cyberdeck', 'Codebreaker', 'Dataspace', 'Firewall', 'Netizen', 'Overclock', 'Rootkit', 'Trojan', 'Psycho',
        'Technocracy', 'Cybernetics', 'Cyberware', 'Datastream', 'Neuromancer', 'Virus', 'Ciphertext', 'Netrunner', 'Cryptocurrency', 'Cybercrime', 'Virtuality', 'Decryptor', 'Hacktivist', 'Surveillance', 'Transhuman', 'Phreaking',
        
        // Street racing
        'Nitro', 'Drift', 'Engine', 'Hydraulic', 'Redline', 'Adrenaline', 'Pitstop', 'Acceleration', 'Chassis', 'Burnout', 'Powerslide', 'Velocity', 'Overdrive', 'Checkpoint', 'Motor', 'Exhaust',
        
        // General nouns that could fit in various categories
        'Pulse', 'Flare', 'Echo', 'Energy', 'Wave', 'Photon', 'Spectrum', 'Chaos',
        'Fusion', 'Fractal', 'Vortex', 'Illusion', 'Polarity', 'Algorithm', 'Paradox', 'Anomaly', 'Flash', 'Pulse', 'Charge', 'Cycle', 'Phase', 'Rhythm', 'Swirl', 'Vibe', 'Horror', 'Mutants',
        
        // Cosmic horror
        'Specter', 'Abomination', 'Torment', 'Malevolence', 'Cataclysm', 'Nightmare', 'Crypt', 'Phantom', 'Blasphemy', 'Occultism', 'Inferno', 'Abyss', 'Diablo', 'Sin', 'Desolation', 'Damnation',
        
        // Demonic
        'Demon', 'Satan', 'Hell', 'Beast', 'Inferno', 'Pandemonium', 'Incubus', 'Succubus', 'Possession', 'Cult', 'Temptation', 'Darkness', 'Ritual', 'Curse', 'Devil', 'Maleficence', 'Unholy', 'Diabolism', 'Malediction', 'Purgatory'
    ];

    function generateRandomPhrase() {
        let tries = 10 
        let randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        let randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

        while( (randomAdjective + randomNoun).length >= 20 && tries > 0){
            randomAdjective =adjectives[Math.floor(Math.random() * adjectives.length)];
            randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
            tries--;
        }
        return `${randomAdjective} ${randomNoun}`;
    }

  return generateRandomPhrase;
}
