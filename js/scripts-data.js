// ===================================
// ANUBIS SCRIPTS DATABASE
// Real scripts from rscripts.net/@Anubis
// ===================================

const anubisScripts = [
    {
        id: 1,
        title: "Murder Mystery 2",
        description: "ESP for murderer, sheriff, and innocents. Auto-collect coins and knife/gun ESP.",
        category: "ESP",
        icon: "🔪",
        rating: 4.8,
        downloads: "310K",
        game: "Murder Mystery 2",
        code: `loadstring(game:HttpGet("https://raw.githubusercontent.com/biokiller59/mm2/refs/heads/main/mm2.lua"))()`
    },
    {
        id: 2,
        title: "Blox Fruits",
        description: "Complete auto-farm system with fruit collection, boss farming, and level grinding. Supports all seas and includes ESP features.",
        category: "Economy",
        icon: "🍎",
        rating: 4.9,
        downloads: "450K",
        game: "Blox Fruits",
        code: `loadstring(game:HttpGet("https://raw.githubusercontent.com/biokiller59/bf/refs/heads/main/bf.lua"))()`
    },
    {
        id: 3,
        title: "Sailor Piece",
        description: "Auto-farm, quest completion, devil fruit finder, and ESP features for Sailor Piece.",
        category: "Economy",
        icon: "⚓",
        rating: 4.8,
        downloads: "340K",
        game: "Sailor Piece",
        code: `loadstring(game:HttpGet("https://raw.githubusercontent.com/biokiller59/Sailor/refs/heads/main/sailor.lua"))()`
    },
    {
        id: 4,
        title: "Defuse Division [ALPHA]",
        description: "Auto-parry system with perfect timing, ESP for ball trajectory, and customizable settings.",
        category: "Combat",
        icon: "💣",
        rating: 4.9,
        downloads: "520K",
        game: "Defuse Division",
        code: `loadstring(game:HttpGet('https://raw.githubusercontent.com/biokiller59/Blueburdj/refs/heads/main/bluebirdjunky.lua'))()`
    },
    {
        id: 5,
        title: "Trade Strength Simulator",
        description: "Auto-training, auto-collect rewards, and teleportation features for fast progression.",
        category: "Economy",
        icon: "💪",
        rating: 4.7,
        downloads: "290K",
        game: "Trade Strength Simulator",
        code: `loadstring(game:HttpGet("https://raw.githubusercontent.com/biokiller59/tts/refs/heads/main/tts.lua"))()`
    },
    {
        id: 6,
        title: "Blind Shot",
        description: "Auto-aim, ESP, and shooting assistance for competitive gameplay.",
        category: "Combat",
        icon: "🎯",
        rating: 4.8,
        downloads: "360K",
        game: "Blind Shot",
        code: `loadstring(game:HttpGet("https://raw.githubusercontent.com/biokiller59/shot/refs/heads/main/shot.lua"))()`
    },
    {
        id: 7,
        title: "Cut Trees",
        description: "Auto-cut trees, auto-sell wood, and teleportation to best farming spots.",
        category: "Economy",
        icon: "🌲",
        rating: 4.6,
        downloads: "280K",
        game: "Cut Trees",
        code: `loadstring(game:HttpGet("https://raw.githubusercontent.com/biokiller59/CutTrees/refs/heads/main/Trees.lua"))()`
    }
];

// Export for use in other files
window.scriptsData = anubisScripts;

if (typeof module !== 'undefined' && module.exports) {
    module.exports = anubisScripts;
}
