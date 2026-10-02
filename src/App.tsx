import React, { useState } from 'react';
import {
  Sparkles,
  FlaskConical,
  RefreshCw,
  Scroll,
  Shield,
  Flame,
  Gem,
  BookOpen,
  Heart,
  Zap,
  Swords,
  BookmarkPlus,
  Layers,
  Trash2,
  Check,
  User,
} from 'lucide-react';

interface CharacterStats {
  health: number;
  mana: number;
  strength: number;
}

interface Character {
  id?: string;
  name: string;
  class: string;
  portrait: string | null;
  portraitIndex: number;
  backstory: string | null;
  stats: CharacterStats;
}

const CLASS_PORTRAITS: Record<string, string[]> = {
  Warrior: [
    '/src/assets/images/portrait_warrior_1790937121982.jpg',
    '/src/assets/images/portrait_warrior_alt_1790937367041.jpg',
  ],
  Mage: [
    '/src/assets/images/portrait_mage_1790937087881.jpg',
    '/src/assets/images/portrait_mage_alt_1790937337256.jpg',
  ],
  Rogue: [
    '/src/assets/images/portrait_rogue_1790937107516.jpg',
    '/src/assets/images/portrait_rogue_alt_1790937354426.jpg',
  ],
  Paladin: [
    '/src/assets/images/portrait_paladin_1790937151369.jpg',
    '/src/assets/images/portrait_paladin_alt_1790937393198.jpg',
  ],
  Ranger: [
    '/src/assets/images/portrait_ranger_1790937135789.jpg',
    '/src/assets/images/portrait_ranger_alt_1790937380412.jpg',
  ],
};

const CLASSES = ['Warrior', 'Mage', 'Rogue', 'Paladin', 'Ranger'];

const FIRST_NAMES = [
  'Aeloria', 'Thalor', 'Garrick', 'Zephyr', 'Lyra',
  'Kaelen', 'Morwenna', 'Darian', 'Eldrin', 'Vespera',
  'Balthazar', 'Sylas', 'Rowan', 'Isolde', 'Faelan',
  'Cassian', 'Elowen', 'Thorin', 'Vaelis', 'Seraphina',
  'Drakon', 'Alastair', 'Kaelith', 'Mirela', 'Orion',
  'Rhiannon', 'Valerius', 'Yvaine', 'Bram', 'Caelum',
  'Elysia', 'Fenris', 'Gideon', 'Hadrian', 'Ignis',
  'Jarek', 'Kallista', 'Lorelei', 'Malakor', 'Nyx',
  'Osric', 'Phaedra', 'Quinn', 'Ragnar', 'Soren',
  'Tariq', 'Ulric', 'Vesper', 'Wynter', 'Xander',
  'Belatrix', 'Corvus', 'Darius', 'Evander', 'Freya',
  'Gareth', 'Hespera', 'Idris', 'Jareth', 'Kaida',
  'Lysander', 'Morgath', 'Nereza', 'Perrin', 'Quillan',
  'Rhydian', 'Selene', 'Theron', 'Uther', 'Valen',
  'Wolfric', 'Xanthos', 'Yorick', 'Zephyrus', 'Maeve'
];

const SURNAMES_AND_TITLES = [
  'Stormcaller', 'Ironwood', 'Shadowmend', 'Brightflame', 'Frostfall',
  'Nightshade', 'Silverbow', 'Runeweaver', 'Dragonstone', 'Emberfall',
  'Moonwhisper', 'Blackthorn', 'Sunstrider', 'Winterglen', 'Ravenshade',
  'Deepdelver', 'Lightbringer', 'Starfall', 'Dawnseeker', 'Swiftstrike',
  'Stormblade', 'Oakenshield', 'Duskbane', 'Grimward', 'Bramblewood',
  'Windrunner', 'Thunderpeak', 'Fireborn', 'Spellforge', 'Netherbane',
  'Greycloak', 'Mistwalker', 'Trueforged', 'Bloodmoon', 'Wildheart'
];

function getRandomElement<T>(array: T[], exclude?: T): T {
  if (array.length <= 1) return array[0];
  let choice: T;
  do {
    choice = array[Math.floor(Math.random() * array.length)];
  } while (choice === exclude && array.length > 1);
  return choice;
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateStatsForClass(characterClass: string): CharacterStats {
  switch (characterClass) {
    case 'Warrior':
      return {
        health: getRandomInt(120, 160),
        mana: getRandomInt(25, 50),
        strength: getRandomInt(85, 100),
      };
    case 'Mage':
      return {
        health: getRandomInt(65, 95),
        mana: getRandomInt(125, 165),
        strength: getRandomInt(35, 55),
      };
    case 'Rogue':
      return {
        health: getRandomInt(80, 110),
        mana: getRandomInt(60, 90),
        strength: getRandomInt(65, 85),
      };
    case 'Paladin':
      return {
        health: getRandomInt(110, 145),
        mana: getRandomInt(75, 105),
        strength: getRandomInt(75, 95),
      };
    case 'Ranger':
      return {
        health: getRandomInt(90, 120),
        mana: getRandomInt(60, 90),
        strength: getRandomInt(70, 90),
      };
    default:
      return {
        health: getRandomInt(80, 120),
        mana: getRandomInt(50, 100),
        strength: getRandomInt(50, 90),
      };
  }
}

function generateBackstoryForCharacter(
  name: string,
  characterClass: string,
  excludeBackstory?: string | null
): string {
  const originTemplates: Record<string, ((n: string) => string)[]> = {
    Warrior: [
      (n) =>
        `Hailing from the jagged peaks where the iron mines meet the storm, ${n} was forged into a peerless Warrior after defending their clan's ancestral forge from a dragon raid. Now armed with heavy steel and relentless valor, they march across the realm in search of worthy foes.`,
      (n) =>
        `Raised beneath the war-torn banners of the Northern Citadel, ${n} rose to become an unstoppable Warrior when they broke a castle siege single-handedly. They now wander the broken kingdoms, offering their shield to all who cannot fight for themselves.`,
      (n) =>
        `Born during a crimson solar eclipse, ${n} survived brutal gladiatorial arenas to earn the legendary status of a master Warrior. Their heavy armor bears the honorable scars of a hundred battles fought to preserve the peace of the frontier.`,
      (n) =>
        `Trained from youth in the mountain bastion academies, ${n} answered the call of the Warrior when subterranean horrors breached the outer walls. Wielding their ancestral greatsword, they swore an unyielding oath to stand as an unbreakable shield against darkness.`,
    ],
    Mage: [
      (n) =>
        `After uncovering a forbidden grimoire in the sunken library of their ancestors, ${n} awakened volatile arcane leylines and became an enigmatic Mage. They now traverse the astral planes to decipher the cosmic secrets that bind reality together.`,
      (n) =>
        `Chosen by the High Spire for their rare celestial resonance, ${n} mastered prismatic incantations as a brilliant Mage. Every spell they weave reshapes ancient elemental energies with effortless elegance and devastating power.`,
      (n) =>
        `Born beneath a rare star alignment on the winter solstice, ${n} possessed an innate affinity for the mystical arts that soon defined their path as a Mage. Guided by arcane visions in the scrying glass, they seek lost artifacts to avert an impending cataclysm.`,
      (n) =>
        `Surviving an arcane tempest in the crystalline wastes, ${n} harnessed the raw storm energy to emerge as a formidable Mage. Their enchanted staff channels primordial fire and frost against any who dare disrupt the arcane balance.`,
    ],
    Rogue: [
      (n) =>
        `Orphaned in the labyrinthine underbelly of the royal port, ${n} honed the silent arts of deception to survive as an elusive Rogue. Drifting like a shadow through midnight alleys, they liberate sacred relics from corrupt oligarchs.`,
      (n) =>
        `Once an acrobatic prodigy in a clandestine thieves' guild, ${n} turned their quick reflexes and razor instincts into the calling of a master Rogue. No fortified vault in the seven kingdoms can withstand their deft touch and lock-shattering finesse.`,
      (n) =>
        `Trained in the whisper networks of the underground brotherhood, ${n} carved out a fearsome reputation as a daring Rogue who deals in secrets and starlight. Moving without a whisper, they strike from unseen angles before vanishing into the night.`,
      (n) =>
        `Escaping the treacherous dungeons of the Sunken Fortress, ${n} adopted the mantle of Rogue to settle old debts with ruthless precision. Their swift daggers and sharp wits keep them one heartbeat ahead of the royal pursuers.`,
    ],
    Paladin: [
      (n) =>
        `Kneeling before the sacred Sun Altar during the great vigil, ${n} dedicated their life as a righteous Paladin of the Radiant Order. Their blessed shield reflects divine light, banishing lingering fiends and cleansing corrupted ground.`,
      (n) =>
        `When demonic incursions ravaged their frontier homeland, ${n} took up the consecrated warhammer to stand as an unwavering Paladin. They ride forth under solemn oaths of chivalry, defending the innocent and striking down evil wherever it festers.`,
      (n) =>
        `Anointed with celestial holy oils in the Cathedral of Dawn, ${n} embraced the sacred duties of a beacon-bearing Paladin. Their radiant aura bolsters weary allies and brings divine judgment upon malevolent tyrants.`,
      (n) =>
        `Heir to a sacred lineage of solar temple guardians, ${n} swore an unbending oath to preserve the holy flame as a stalwart Paladin. Guided by luminous conviction, their gleaming war-plate shines as a symbol of hope in the darkest dungeons.`,
    ],
    Ranger: [
      (n) =>
        `Raised by the primal guardian beasts of the deep elderwood, ${n} mastered the secret paths of the wild to become an untamed Ranger. With arrows that never stray and tracking skills whispered in legend, they keep eternal vigil over the sacred groves.`,
      (n) =>
        `From the snowbound passes of the Frostfall Peaks, ${n} patrols the treacherous frontier borders as a solitary Ranger. Guided by their spirit hawk companion, they can detect the whisper of approaching danger before a single leaf has settled.`,
      (n) =>
        `Wandering the ancient moss-draped canopies where mortals rarely tread, ${n} accepted the vow of the woodland Ranger to protect primal nature. Their drawn bow sings with the forest wind, striking true against any monstrosity that disturbs the wild.`,
      (n) =>
        `Trained by nomad pathfinders across the untamed wilderness, ${n} became a legendary Ranger capable of reading the language of the earth. They scout the deepest frontiers, guiding lost wanderers safely past prowling shadow beasts.`,
    ],
  };

  const pool = originTemplates[characterClass] || originTemplates.Warrior;
  let candidates = pool.map((fn) => fn(name));
  if (excludeBackstory && candidates.length > 1) {
    candidates = candidates.filter((text) => text !== excludeBackstory);
  }
  return candidates[Math.floor(Math.random() * candidates.length)];
}

export default function App() {
  const [character, setCharacter] = useState<Character>({
    name: 'Thalor Ironwood',
    class: 'Warrior',
    portrait: null,
    portraitIndex: 0,
    backstory: null,
    stats: generateStatsForClass('Warrior'),
  });

  const [deck, setDeck] = useState<Character[]>([]);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const handleGenerateCharacter = () => {
    let newName: string;
    do {
      const firstName = getRandomElement(FIRST_NAMES);
      const surname = getRandomElement(SURNAMES_AND_TITLES);
      newName = `${firstName} ${surname}`;
    } while (character && newName === character.name);

    const newClass = getRandomElement(CLASSES, character?.class);
    const newStats = generateStatsForClass(newClass);

    setCharacter({
      name: newName,
      class: newClass,
      portrait: null,
      portraitIndex: 0,
      backstory: null,
      stats: newStats,
    });
  };

  const handleGeneratePortrait = () => {
    const portraits = CLASS_PORTRAITS[character.class] || CLASS_PORTRAITS.Warrior;
    setCharacter((prev) => ({
      ...prev,
      portrait: portraits[0],
      portraitIndex: 0,
    }));
  };

  const handleRegeneratePortrait = () => {
    const portraits = CLASS_PORTRAITS[character.class] || CLASS_PORTRAITS.Warrior;
    setCharacter((prev) => {
      const nextIndex = (prev.portraitIndex + 1) % portraits.length;
      return {
        ...prev,
        portrait: portraits[nextIndex],
        portraitIndex: nextIndex,
      };
    });
  };

  const handleGenerateBackstory = () => {
    const backstory = generateBackstoryForCharacter(
      character.name,
      character.class,
      character.backstory
    );
    setCharacter((prev) => ({
      ...prev,
      backstory,
    }));
  };

  const handleSaveToDeck = () => {
    const savedCard: Character = {
      ...character,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    };
    setDeck((prev) => [savedCard, ...prev]);
    setSaveStatus('Hero inscribed into My Deck!');
    setTimeout(() => {
      setSaveStatus(null);
    }, 2800);
  };

  const handleRemoveFromDeck = (idToRemove?: string) => {
    if (!idToRemove) return;
    setDeck((prev) => prev.filter((card) => card.id !== idToRemove));
  };

  return (
    <main className="min-h-screen w-full workbench-bg text-amber-100 flex flex-col items-center justify-start p-4 sm:p-8 relative selection:bg-amber-600 selection:text-amber-100 overflow-x-hidden">
      {/* Alchemist's Workbench Ambient Atmosphere Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-25 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Workbench Tools & Reagents Bar */}
      <div className="w-full max-w-3xl mx-auto flex items-center justify-between text-xs text-amber-500/70 font-alchemy-serif tracking-widest uppercase mb-4 px-2 select-none border-b border-amber-900/40 pb-2">
        <div className="flex items-center gap-2">
          <FlaskConical className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>Alchemist&apos;s Transmutation Workbench</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-amber-600/80">🜁 🜂 🜃 🜄</span>
          <div className="flex items-center gap-1.5 text-amber-400/90">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>Deck: {deck.length}</span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-3xl mx-auto flex flex-col items-center text-center relative z-10">
        {/* Header with Ancient Scroll Aesthetics */}
        <header className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-800/50 text-amber-400 text-xs font-alchemy-serif tracking-wider uppercase mb-3 shadow-inner">
            <Flame className="w-3 h-3 text-amber-500" />
            <span>Alchemical Adventurer Codex</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-fantasy-title font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-amber-200 to-amber-500 drop-shadow-[0_2px_10px_rgba(217,119,6,0.3)] mb-2">
            Fantasy Character Generator
          </h1>
          <p className="text-amber-200/70 font-parchment text-base sm:text-lg italic max-w-md mx-auto">
            Transmute raw essences into fully detailed player cards and assemble your guild deck
          </p>
        </header>

        {/* REFORMATTED FULL-FEATURED PLAYER CARD */}
        <div className="w-full max-w-xl mx-auto mb-8">
          <div
            aria-live="polite"
            className="player-card border-4 border-amber-600/80 rounded-3xl p-5 sm:p-7 shadow-2xl relative overflow-hidden text-left"
          >
            {/* Ornate Brass Corner Brackets */}
            <div className="absolute top-2.5 left-2.5 w-6 h-6 border-t-2 border-l-2 border-amber-400 pointer-events-none" />
            <div className="absolute top-2.5 right-2.5 w-6 h-6 border-t-2 border-r-2 border-amber-400 pointer-events-none" />
            <div className="absolute bottom-2.5 left-2.5 w-6 h-6 border-b-2 border-l-2 border-amber-400 pointer-events-none" />
            <div className="absolute bottom-2.5 right-2.5 w-6 h-6 border-b-2 border-r-2 border-amber-400 pointer-events-none" />

            {/* Inner Gilded Player Card Rim */}
            <div className="absolute inset-1.5 rounded-2xl border border-amber-500/30 pointer-events-none" />

            {/* Card Header: Name & Class */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-amber-700/50 pb-4 mb-5">
              <div>
                <span className="text-[11px] uppercase tracking-widest font-alchemy-serif font-semibold text-amber-400/90 block mb-0.5">
                  Character Name
                </span>
                <div
                  data-testid="character-name"
                  className="text-2xl sm:text-3xl font-fantasy-name font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-200 to-amber-400 drop-shadow-[0_2px_10px_rgba(245,158,11,0.4)]"
                >
                  {character.name}
                </div>
              </div>

              <div className="sm:text-right">
                <span className="text-[11px] uppercase tracking-widest font-alchemy-serif font-semibold text-amber-400/90 block mb-0.5">
                  Class
                </span>
                <div
                  data-testid="character-class"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-950/70 border border-amber-600/60 text-amber-300 font-alchemy-serif font-bold text-sm sm:text-base tracking-wider"
                >
                  <Shield className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
                  <span>{character.class}</span>
                </div>
              </div>
            </div>

            {/* Main Portrait Section */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-5">
              {/* Portrait Frame */}
              <div className="shrink-0 flex flex-col items-center">
                <div className="w-40 h-40 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-2 border-amber-500/80 portrait-frame bg-stone-950 relative flex items-center justify-center p-1">
                  {/* Brass Corner Rivets */}
                  <div className="absolute top-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-sm shadow-amber-900 z-10" />
                  <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-sm shadow-amber-900 z-10" />
                  <div className="absolute bottom-1.5 left-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-sm shadow-amber-900 z-10" />
                  <div className="absolute bottom-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 shadow-sm shadow-amber-900 z-10" />

                  {character.portrait ? (
                    <img
                      src={character.portrait}
                      alt={`${character.name} the ${character.class} portrait`}
                      referrerPolicy="no-referrer"
                      data-testid="character-portrait"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center p-3 text-center">
                      <User className="w-10 h-10 text-amber-600/70 mb-2" aria-hidden="true" />
                      <span className="text-xs font-alchemy-serif font-medium text-amber-300/80">
                        Portrait Uncast
                      </span>
                      <span className="text-[10px] font-parchment text-amber-400/60 mt-0.5 italic">
                        Click &quot;Generate&quot;
                      </span>
                    </div>
                  )}
                </div>

                {/* Portrait Action Buttons: Generate & Regenerate */}
                <div className="flex items-center gap-2 mt-3 w-full">
                  <button
                    type="button"
                    onClick={handleGeneratePortrait}
                    data-testid="generate-portrait-button"
                    className="flex-1 inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg bg-gradient-to-b from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 active:from-amber-600 text-stone-950 font-alchemy-serif font-bold text-xs tracking-wider uppercase transition-all shadow-sm border border-amber-300/40 cursor-pointer"
                  >
                    <FlaskConical className="w-3 h-3" aria-hidden="true" />
                    <span>Generate</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleRegeneratePortrait}
                    data-testid="regenerate-portrait-button"
                    className="flex-1 inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg bg-stone-900/90 hover:bg-stone-800 active:bg-stone-950 text-amber-300 border border-amber-700/60 font-alchemy-serif font-semibold text-xs tracking-wider uppercase transition-all shadow-sm cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3 text-amber-400" aria-hidden="true" />
                    <span>Regenerate</span>
                  </button>
                </div>
              </div>

              {/* STATS SECTION: Health, Mana, Strength */}
              <div className="flex-1 w-full flex flex-col justify-between self-stretch space-y-3">
                <div className="text-[11px] uppercase tracking-widest font-alchemy-serif font-semibold text-amber-400/90 border-b border-amber-900/40 pb-1 flex items-center justify-between">
                  <span>Character Attributes</span>
                  <span className="text-amber-500/60">Tier I</span>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-1 gap-2.5">
                  {/* Health Stat */}
                  <div className="bg-stone-950/80 rounded-xl p-2.5 border border-red-900/40 flex items-center justify-between shadow-inner">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-red-950/90 border border-red-700/50 flex items-center justify-center text-red-400 shadow-sm">
                        <Heart className="w-4 h-4 fill-red-500 text-red-400" aria-hidden="true" />
                      </div>
                      <span className="text-xs font-alchemy-serif tracking-wider text-red-200">
                        Health
                      </span>
                    </div>
                    <span
                      data-testid="stat-health"
                      className="text-base sm:text-lg font-alchemy-serif font-extrabold text-red-300 pl-1"
                    >
                      {character.stats.health}
                    </span>
                  </div>

                  {/* Mana Stat */}
                  <div className="bg-stone-950/80 rounded-xl p-2.5 border border-cyan-900/40 flex items-center justify-between shadow-inner">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-cyan-950/90 border border-cyan-700/50 flex items-center justify-center text-cyan-400 shadow-sm">
                        <Zap className="w-4 h-4 fill-cyan-400 text-cyan-300" aria-hidden="true" />
                      </div>
                      <span className="text-xs font-alchemy-serif tracking-wider text-cyan-200">
                        Mana
                      </span>
                    </div>
                    <span
                      data-testid="stat-mana"
                      className="text-base sm:text-lg font-alchemy-serif font-extrabold text-cyan-300 pl-1"
                    >
                      {character.stats.mana}
                    </span>
                  </div>

                  {/* Strength Stat */}
                  <div className="bg-stone-950/80 rounded-xl p-2.5 border border-amber-900/40 flex items-center justify-between shadow-inner">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-amber-950/90 border border-amber-700/50 flex items-center justify-center text-amber-400 shadow-sm">
                        <Swords className="w-4 h-4 text-amber-400" aria-hidden="true" />
                      </div>
                      <span className="text-xs font-alchemy-serif tracking-wider text-amber-200">
                        Strength
                      </span>
                    </div>
                    <span
                      data-testid="stat-strength"
                      className="text-base sm:text-lg font-alchemy-serif font-extrabold text-amber-300 pl-1"
                    >
                      {character.stats.strength}
                    </span>
                  </div>
                </div>

                <div className="text-[11px] font-parchment text-amber-300/60 italic">
                  Stats calibrated by ancestral class potency &amp; celestial resonance.
                </div>
              </div>
            </div>

            {/* Backstory Inscription Section */}
            <div className="border-t border-amber-800/40 pt-4 mb-5">
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-1.5 text-xs font-alchemy-serif tracking-widest text-amber-400 uppercase">
                  <BookOpen className="w-3.5 h-3.5 text-amber-500" />
                  <span>Origin Chronicle</span>
                </div>

                <button
                  type="button"
                  onClick={handleGenerateBackstory}
                  data-testid="generate-backstory-button"
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-b from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 active:from-amber-700 text-stone-950 font-alchemy-serif font-bold text-xs tracking-wider uppercase transition-all shadow-sm border border-amber-400/40 cursor-pointer"
                >
                  <Scroll className="w-3 h-3" aria-hidden="true" />
                  <span>Generate Backstory</span>
                </button>
              </div>

              <div className="bg-stone-950/80 rounded-xl p-3.5 border border-amber-900/50 shadow-inner min-h-[64px] flex items-center">
                {character.backstory ? (
                  <p
                    data-testid="character-backstory"
                    className="text-amber-100/95 font-parchment text-sm sm:text-base leading-relaxed italic"
                  >
                    &ldquo;{character.backstory}&rdquo;
                  </p>
                ) : (
                  <p className="text-amber-500/60 font-parchment text-xs sm:text-sm italic text-center w-full">
                    Origin unrevealed. Click &quot;Generate Backstory&quot; to summon this hero&apos;s lore.
                  </p>
                )}
              </div>
            </div>

            {/* Card Footer: Save to Deck Button & Feedback */}
            <div className="border-t-2 border-amber-700/50 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs font-parchment text-amber-400/80 italic">
                {saveStatus ? (
                  <span className="inline-flex items-center gap-1.5 text-emerald-400 font-alchemy-serif not-italic font-semibold animate-pulse">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>{saveStatus}</span>
                  </span>
                ) : (
                  <span>Ready for archive into your permanent grimoire</span>
                )}
              </div>

              <button
                type="button"
                onClick={handleSaveToDeck}
                data-testid="save-to-deck-button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-b from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 active:from-amber-600 text-stone-950 font-alchemy-serif font-extrabold text-sm tracking-wider uppercase transition-all shadow-md shadow-amber-950/70 border border-amber-200/50 cursor-pointer focus-visible:outline-2 focus-visible:outline-amber-400 select-none"
              >
                <BookmarkPlus className="w-4 h-4" aria-hidden="true" />
                <span>Save to Deck</span>
              </button>
            </div>
          </div>
        </div>

        {/* Existing Generate Character Button (Transmutation Altar Seal) */}
        <div className="mb-14">
          <button
            type="button"
            onClick={handleGenerateCharacter}
            data-testid="generate-button"
            className="inline-flex items-center justify-center gap-3 px-9 py-4 rounded-2xl bg-gradient-to-b from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:via-amber-500 hover:to-amber-600 active:from-amber-700 active:to-amber-800 text-stone-950 font-alchemy-serif font-extrabold text-base sm:text-lg tracking-wider uppercase transition-all shadow-[0_10px_30px_rgba(217,119,6,0.35)] hover:shadow-[0_15px_35px_rgba(217,119,6,0.5)] border-2 border-amber-300/60 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 select-none"
          >
            <Sparkles className="w-5 h-5 text-stone-950 animate-spin" style={{ animationDuration: '6s' }} aria-hidden="true" />
            <span>Generate Character</span>
          </button>
        </div>

        {/* MY DECK SECTION */}
        <section
          aria-labelledby="deck-heading"
          data-testid="my-deck-section"
          className="w-full text-left border-t-2 border-amber-900/60 pt-10 pb-16"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-950/80 border border-amber-700/60 flex items-center justify-center text-amber-400 shadow-md">
                <Layers className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <h2
                  id="deck-heading"
                  className="text-2xl sm:text-3xl font-fantasy-title font-bold text-amber-200"
                >
                  My Deck
                </h2>
                <p className="text-xs font-alchemy-serif text-amber-500/70 tracking-wider">
                  ARCHIVED CARDS IN CRUCIBLE CODEX ({deck.length})
                </p>
              </div>
            </div>

            {deck.length > 0 && (
              <span className="text-xs font-parchment text-amber-400/80 italic">
                {deck.length} {deck.length === 1 ? 'champion' : 'champions'} ready for battle
              </span>
            )}
          </div>

          {/* Saved Cards Grid */}
          {deck.length === 0 ? (
            <div className="bg-stone-950/60 border-2 border-dashed border-amber-900/40 rounded-2xl p-8 sm:p-12 text-center flex flex-col items-center justify-center">
              <BookmarkPlus className="w-12 h-12 text-amber-700/60 mb-3" aria-hidden="true" />
              <p className="text-base sm:text-lg font-alchemy-serif font-bold text-amber-300/80 mb-1">
                Your Deck is Empty
              </p>
              <p className="text-sm font-parchment text-amber-500/70 italic max-w-sm">
                Generate adventurers above, cast their portraits and backstories, then click &quot;Save to Deck&quot; to archive them here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {deck.map((card, idx) => (
                <div
                  key={card.id || idx}
                  data-testid="deck-card"
                  className="player-card border-2 border-amber-600/70 rounded-2xl p-4 sm:p-5 shadow-xl relative flex flex-col justify-between group transition-transform hover:-translate-y-1"
                >
                  {/* Card Corner Accents */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-amber-400 pointer-events-none" />
                  <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-amber-400 pointer-events-none" />
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-amber-400 pointer-events-none" />
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-amber-400 pointer-events-none" />

                  {/* Card Top: Name & Remove */}
                  <div>
                    <div className="flex items-start justify-between gap-2 border-b border-amber-800/40 pb-2 mb-3">
                      <div>
                        <div className="text-lg font-fantasy-name font-bold text-amber-100 leading-tight">
                          {card.name}
                        </div>
                        <span className="text-[11px] font-alchemy-serif font-bold text-amber-400 uppercase tracking-wider">
                          {card.class}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveFromDeck(card.id)}
                        title="Remove from Deck"
                        className="text-amber-700 hover:text-red-400 transition-colors p-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                        <span className="sr-only">Remove {card.name}</span>
                      </button>
                    </div>

                    {/* Card Portrait & Stats */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-20 h-20 rounded-xl overflow-hidden border border-amber-500/70 bg-stone-950 shrink-0 relative flex items-center justify-center">
                        {card.portrait ? (
                          <img
                            src={card.portrait}
                            alt={`${card.name} portrait`}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User className="w-8 h-8 text-amber-600/50" aria-hidden="true" />
                        )}
                      </div>

                      <div className="flex-1 space-y-1 text-xs font-alchemy-serif">
                        <div className="flex items-center justify-between bg-stone-950/70 px-2 py-0.5 rounded border border-red-950">
                          <span className="text-red-400 flex items-center gap-1">
                            <Heart className="w-3 h-3 fill-red-500" /> HP
                          </span>
                          <span className="font-bold text-red-200">{card.stats.health}</span>
                        </div>

                        <div className="flex items-center justify-between bg-stone-950/70 px-2 py-0.5 rounded border border-cyan-950">
                          <span className="text-cyan-400 flex items-center gap-1">
                            <Zap className="w-3 h-3 fill-cyan-400" /> MP
                          </span>
                          <span className="font-bold text-cyan-200">{card.stats.mana}</span>
                        </div>

                        <div className="flex items-center justify-between bg-stone-950/70 px-2 py-0.5 rounded border border-amber-950">
                          <span className="text-amber-400 flex items-center gap-1">
                            <Swords className="w-3 h-3" /> STR
                          </span>
                          <span className="font-bold text-amber-200">{card.stats.strength}</span>
                        </div>
                      </div>
                    </div>

                    {/* Backstory Inscription Snippet */}
                    {card.backstory && (
                      <div className="bg-stone-950/60 rounded-lg p-2.5 border border-amber-950/60 mt-1">
                        <p className="text-xs font-parchment text-amber-200/80 italic line-clamp-3">
                          &ldquo;{card.backstory}&rdquo;
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="text-[10px] font-alchemy-serif text-amber-600/60 text-right pt-2 border-t border-amber-950/40 mt-3">
                    INSCRIBED CARD #{idx + 1}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Alchemical Workbench Footer Accents */}
        <footer className="mt-4 flex items-center gap-4 text-xs font-parchment text-amber-600/70 select-none">
          <span>Sulfur · Mercury · Salt</span>
          <span>✦</span>
          <span>Transmuted in the Royal Crucible</span>
        </footer>
      </div>
    </main>
  );
}
