// ============================================
//  精灵宠物世界 V2 - 全功能版
//  图像生成: Pollinations AI
// ============================================

// ===== 配置 =====
let CFG = {
    apiKey: '',
    model: 'flux',
    base: 'https://image.pollinations.ai/prompt/'
};

function imgUrl(prompt, seed, w = 512, h = 512) {
    let url = `${CFG.base}${encodeURIComponent(prompt)}?width=${w}&height=${h}&seed=${seed}&nologo=true&model=${CFG.model}`;
    if (CFG.apiKey) url += `&token=${encodeURIComponent(CFG.apiKey)}`;
    return url;
}

// ===== 精灵数据库 =====
const DB = {
    species: [
        { id: 0, name: '火焰狐', base: 'fire fox', el: 'fire' },
        { id: 1, name: '水晶龙', base: 'crystal water dragon', el: 'water' },
        { id: 2, name: '雷电鸟', base: 'thunder bird', el: 'electric' },
        { id: 3, name: '森之鹿', base: 'forest deer', el: 'grass' },
        { id: 4, name: '暗影猫', base: 'shadow cat', el: 'dark' },
        { id: 5, name: '圣光兔', base: 'holy light bunny', el: 'light' },
        { id: 6, name: '冰霜狼', base: 'frost wolf', el: 'ice' },
        { id: 7, name: '花精灵', base: 'flower fairy', el: 'grass' },
        { id: 8, name: '岩石熊', base: 'rock lava bear', el: 'fire' },
        { id: 9, name: '星辰蝶', base: 'starlight butterfly', el: 'light' },
        { id: 10, name: '幻梦蛇', base: 'dream serpent', el: 'dark' },
        { id: 11, name: '翡翠龟', base: 'jade turtle', el: 'water' },
        { id: 12, name: '烈焰狮', base: 'flame lion', el: 'fire' },
        { id: 13, name: '月光狐', base: 'moonlight fox', el: 'light' },
        { id: 14, name: '风暴鹰', base: 'storm eagle', el: 'electric' },
        { id: 15, name: '樱花猫', base: 'cherry blossom cat', el: 'grass' },
        { id: 16, name: '深海鲸', base: 'deep sea whale', el: 'water' },
        { id: 17, name: '紫晶蝎', base: 'amethyst scorpion', el: 'dark' },
        { id: 18, name: '极光鱼', base: 'aurora fish', el: 'ice' },
        { id: 19, name: '黄金凤', base: 'golden phoenix', el: 'fire' },
        { id: 20, name: '雪绒兔', base: 'snow fluffy bunny', el: 'ice' },
        { id: 21, name: '霹雳虎', base: 'lightning tiger', el: 'electric' },
        { id: 22, name: '暮光鸦', base: 'twilight raven', el: 'dark' },
        { id: 23, name: '碧玉蛙', base: 'jade frog', el: 'grass' },
        { id: 24, name: '珊瑚马', base: 'coral seahorse', el: 'water' },
        { id: 25, name: '雷霆鼠', base: 'thunder hamster', el: 'electric' },
        { id: 26, name: '古龙幼崽', base: 'baby ancient dragon', el: 'dragon' },
        { id: 27, name: '天空龙', base: 'sky dragon', el: 'dragon' },
        { id: 28, name: '混沌龙', base: 'chaos dragon', el: 'dragon' },
        { id: 29, name: '熔岩蜥', base: 'lava lizard', el: 'fire' },
        { id: 30, name: '影刃豹', base: 'shadow blade panther', el: 'dark' },
        { id: 31, name: '彩虹蜗', base: 'rainbow snail', el: 'light' },
    ],
    colors: [
        { n: '赤红', d: 'vibrant crimson red' }, { n: '蔚蓝', d: 'azure blue cyan' },
        { n: '翠绿', d: 'emerald green' }, { n: '金黄', d: 'golden amber' },
        { n: '幽紫', d: 'deep violet purple' }, { n: '银白', d: 'silver pearl white' },
        { n: '玫粉', d: 'rose pink magenta' }, { n: '墨黑', d: 'obsidian black with glowing accents' },
        { n: '虹彩', d: 'iridescent holographic rainbow' }, { n: '星蓝', d: 'cosmic starry indigo' },
    ],
    features: [
        'with tiny crown', 'with glowing runes', 'surrounded by crystals',
        'with sparkling wings', 'wearing magic scarf', 'with gem on forehead',
        'with magical aura particles', 'with ethereal flame tail',
        'wearing flower garland', 'with constellation patterns',
        'holding magic orb', 'with floating sparkles',
    ],
    bgs: [
        'enchanted forest bioluminescent', 'crystal lake sunset', 'starry aurora sky',
        'mystical crystal cave', 'floating island clouds', 'cherry blossom twilight',
        'snowy mountain northern lights', 'magical library floating books',
    ],
    personalities: [
        { t: '活泼', d: '充满活力,蹦蹦跳跳' }, { t: '温柔', d: '温顺可爱,喜欢撒娇' },
        { t: '高冷', d: '外冷内热,很有个性' }, { t: '贪吃', d: '对美食毫无抵抗力' },
        { t: '勇敢', d: '战斗时勇往直前' }, { t: '害羞', d: '容易脸红,很内向' },
        { t: '调皮', d: '总是恶作剧' }, { t: '睿智', d: '聪明绝顶' },
        { t: '慵懒', d: '只想睡觉' }, { t: '傲娇', d: '嘴硬心软' },
    ],
    titles: [
        '草丛精灵', '丛林守护者', '魔法学徒', '远古后裔', '星辰之子',
        '月光使者', '风暴行者', '深渊观测者', '冰原猎手', '火焰舞者',
        '梦境行者', '水晶守卫', '暗夜先锋', '黎明来客', '彩虹追手',
    ],
    elIcon: { fire: '🔥', water: '💧', grass: '🌿', electric: '⚡', ice: '❄️', dark: '🌑', light: '☀️', dragon: '🐉' },
    elName: { fire: '火系', water: '水系', grass: '草系', electric: '电系', ice: '冰系', dark: '暗系', light: '光系', dragon: '龙系' },
    // 五阶进化描述器
    stages: [
        { name: '初生', prefix: 'tiny baby chibi cute', suffix: 'small adorable eyes, pastel colors, soft lighting', color: '#94a3b8' },
        { name: '成长', prefix: 'young growing energetic', suffix: 'small magical aura, dynamic pose, vivid colors', color: '#34d399' },
        { name: '成熟', prefix: 'adult powerful majestic', suffix: 'strong magical energy, battle ready, detailed armor elements', color: '#60a5fa' },
        { name: '完全', prefix: 'epic magnificent armored', suffix: 'brilliant glowing aura, crystalline armor, powerful energy waves, dramatic lighting', color: '#c084fc' },
        { name: '究极', prefix: 'divine legendary ultimate godlike', suffix: 'cosmic energy, celestial wings, golden divine armor, universe background, god rays, transcendent power', color: '#fbbf24' },
    ],
    // 冒险塔敌人
    enemies: [
        { name: '史莱姆', prompt: 'cute angry slime monster', minFloor: 1 },
        { name: '哥布林', prompt: 'goblin warrior with club', minFloor: 1 },
        { name: '毒蘑菇', prompt: 'evil poisonous mushroom monster', minFloor: 2 },
        { name: '骷髅兵', prompt: 'skeleton warrior with bone sword', minFloor: 3 },
        { name: '地狱犬', prompt: 'hellhound cerberus fire breathing', minFloor: 5 },
        { name: '暗影骑士', prompt: 'dark shadow knight with ghostly armor', minFloor: 7 },
        { name: '冰霜巨人', prompt: 'frost giant ice golem towering', minFloor: 9 },
        { name: '九头蛇', prompt: 'hydra nine headed serpent', minFloor: 11 },
        { name: '堕落天使', prompt: 'fallen angel dark wings burning', minFloor: 13 },
        { name: '混沌魔龙', prompt: 'chaos dragon demon massive', minFloor: 15 },
        { name: '虚空领主', prompt: 'void lord cosmic entity dark matter', minFloor: 18 },
        { name: '毁灭之神', prompt: 'god of destruction apocalyptic titan', minFloor: 20 },
    ],
    bosses: [
        { name: '🔥 炎魔领主', prompt: 'infernal demon lord massive fire throne', floor: 5 },
        { name: '❄️ 冰霜女王', prompt: 'frost queen ice empress crystal throne', floor: 10 },
        { name: '🌑 暗影帝王', prompt: 'shadow emperor darkness incarnate', floor: 15 },
        { name: '🐉 远古龙神', prompt: 'ancient dragon god cosmic supreme being', floor: 20 },
        { name: '💀 终焉之主', prompt: 'death god final boss apocalypse entity supreme', floor: 25 },
    ],
};

// ===== 商店物品 =====
const SHOP = [
    // 食物
    { id: 'apple', name: '🍎 魔法苹果', desc: '基础食物,恢复少量饱食度', cat: 'food', price: 30, effect: { hunger: 20 },
      prompt: 'magical glowing apple fantasy food item, game icon' },
    { id: 'meat', name: '🍖 龙肉排', desc: '高级食物,大量恢复饱食度', cat: 'food', price: 80, effect: { hunger: 50, hp: 10 },
      prompt: 'fantasy dragon meat steak glowing, game icon' },
    { id: 'cake', name: '🍰 精灵蛋糕', desc: '心情+饱食双回复', cat: 'food', price: 120, effect: { hunger: 30, mood: 30 },
      prompt: 'magical fairy cake sparkling rainbow, game icon' },
    { id: 'cosmic', name: '🧁 宇宙甜点', desc: '全属性+20,顶级美味', cat: 'food', price: 250, effect: { hunger: 20, mood: 20, hp: 20, energy: 20 },
      prompt: 'cosmic space cupcake galaxy nebula flavor, game icon' },
    { id: 'candy', name: '🍬 经验糖果', desc: '甜蜜的糖果,增加50经验', cat: 'food', price: 180, effect: {}, expBonus: 50,
      prompt: 'magical experience candy glowing star shaped, game icon' },
    // 药品
    { id: 'potion', name: '💊 基础药水', desc: '回复30 HP', cat: 'medicine', price: 50, effect: { hp: 30 },
      prompt: 'red health potion bottle glowing, fantasy game icon' },
    { id: 'hipotion', name: '💚 高级药水', desc: '回复80 HP', cat: 'medicine', price: 150, effect: { hp: 80 },
      prompt: 'green advanced potion bottle sparkling, fantasy game icon' },
    { id: 'elixir', name: '⭐ 全恢复药', desc: '全属性回满!', cat: 'medicine', price: 350, effect: { hp: 100, mood: 100, hunger: 100, energy: 100 },
      prompt: 'golden elixir bottle rainbow glow full restore, game icon' },
    { id: 'energydrink', name: '⚡ 能量饮料', desc: '体力+50', cat: 'medicine', price: 60, effect: { energy: 50 },
      prompt: 'blue energy drink lightning bolt, fantasy game icon' },
    // 特殊
    { id: 'refresh', name: '🎨 外观刷新卷', desc: '重新随机精灵外观(保留属性)', cat: 'special', price: 500, effect: {}, isRefresh: true,
      prompt: 'magical scroll with paintbrush rainbow colors, game icon' },
    { id: 'expscroll', name: '📜 经验卷轴', desc: '获得100经验', cat: 'special', price: 300, effect: {}, expBonus: 100,
      prompt: 'ancient golden experience scroll glowing runes, game icon' },
    { id: 'evostone', name: '🔮 进化石', desc: '立即获得5级!', cat: 'special', price: 1200, effect: {}, lvBonus: 5,
      prompt: 'evolution stone glowing crystal purple energy, game icon' },
    { id: 'luckycharm', name: '🍀 幸运符', desc: '下次探索必出稀有精灵', cat: 'special', price: 800, effect: {}, isLucky: true,
      prompt: 'lucky clover charm golden sparkling four leaf, game icon' },
];

// ===== 全局状态 =====
let G = {
    pets: [], gold: 200, totalGen: 0, discovered: [],
    towerFloor: 1, towerMax: 1,
    inventory: {}, // itemId: count
    curEnc: null, curPet: null, lucky: false,
    mergeSlots: [null, null], mergeSelecting: 0,
    battlePet: null, battleEnemy: null, battlePetHP: 0, battleEnemyHP: 0,
    battlePetMaxHP: 0, battleEnemyMaxHP: 0, battleActive: false,
};

// ===== 初始化 =====
function init() {
    loadGame();
    loadSettings();
    initParticles();
    refreshUI();
    loadHeroPreview();
    setInterval(tickStats, 60000);
}

function loadGame() {
    try {
        const s = localStorage.getItem('spw2');
        if (s) {
            const d = JSON.parse(s);
            Object.assign(G, d);
            G.discovered = G.discovered || [];
            G.inventory = G.inventory || {};
        }
    } catch(e) { console.log('Load fail', e); }
}

function saveGame() {
    try {
        const d = { ...G };
        delete d.curEnc; delete d.curPet; delete d.battleActive;
        delete d.mergeSlots; delete d.mergeSelecting;
        delete d.battlePet; delete d.battleEnemy;
        delete d.battlePetHP; delete d.battleEnemyHP;
        delete d.battlePetMaxHP; delete d.battleEnemyMaxHP;
        localStorage.setItem('spw2', JSON.stringify(d));
    } catch(e) {}
}

function loadSettings() {
    try {
        const s = localStorage.getItem('spw2_cfg');
        if (s) Object.assign(CFG, JSON.parse(s));
        document.getElementById('apiKeyInput').value = CFG.apiKey || '';
        document.getElementById('modelSelect').value = CFG.model || 'flux';
    } catch(e) {}
}

function saveSettings() {
    CFG.apiKey = document.getElementById('apiKeyInput').value.trim();
    CFG.model = document.getElementById('modelSelect').value;
    localStorage.setItem('spw2_cfg', JSON.stringify({ apiKey: CFG.apiKey, model: CFG.model }));
    toast('设置已保存!', 'success');
}

function exportSave() {
    const d = JSON.stringify({ game: G, cfg: CFG });
    const blob = new Blob([d], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'spirit_pet_save.json';
    a.click();
    toast('存档已导出!', 'success');
}

function importSave() {
    const input = document.createElement('input');
    input.type = 'file'; input.accept = '.json';
    input.onchange = e => {
        const f = e.target.files[0]; if (!f) return;
        const r = new FileReader();
        r.onload = ev => {
            try {
                const d = JSON.parse(ev.target.result);
                if (d.game) Object.assign(G, d.game);
                if (d.cfg) Object.assign(CFG, d.cfg);
                saveGame(); saveSettings(); refreshUI();
                toast('存档已导入!', 'success');
            } catch(err) { toast('导入失败!', 'error'); }
        };
        r.readAsText(f);
    };
    input.click();
}

function resetAll() {
    if (!confirm('确定删除所有数据? 此操作不可恢复!')) return;
    localStorage.removeItem('spw2');
    location.reload();
}

// ===== 精灵生成核心 =====
function getStage(level) {
    if (level >= 20) return 4;
    if (level >= 15) return 3;
    if (level >= 10) return 2;
    if (level >= 5) return 1;
    return 0;
}

function buildPrompt(sp, color, feature, bg, stage) {
    const s = DB.stages[stage];
    return `${s.prefix} ${color.d} ${sp.base} spirit creature, ${feature}, chibi fantasy creature, ${bg}, ${s.suffix}, detailed, high quality digital art, glowing effects, magical, pokemon inspired style`;
}

function spiritImgUrl(pet, size = 512) {
    const stage = getStage(pet.level || 1);
    const sp = DB.species[pet.speciesId] || DB.species[0];
    const color = DB.colors.find(c => c.n === pet.color) || DB.colors[0];
    const prompt = buildPrompt(sp, color, pet.feature, pet.bg, stage);
    return imgUrl(prompt, pet.seed, size, size);
}

function spiritStageUrl(pet, stageIdx, size = 120) {
    const sp = DB.species[pet.speciesId] || DB.species[0];
    const color = DB.colors.find(c => c.n === pet.color) || DB.colors[0];
    const prompt = buildPrompt(sp, color, pet.feature, pet.bg, stageIdx);
    // 同一只宠物不同阶段用同seed
    return imgUrl(prompt, pet.seed, size, size);
}

function spiritActionUrl(pet, action, size = 512) {
    const stage = getStage(pet.level || 1);
    const sp = DB.species[pet.speciesId] || DB.species[0];
    const color = DB.colors.find(c => c.n === pet.color) || DB.colors[0];
    const s = DB.stages[stage];
    const actPrompts = {
        feed: `happily eating delicious magical food, joyful`,
        play: `playing energetically, jumping, excited dynamic`,
        sleep: `sleeping peacefully curled up, cute zzz`,
        train: `training, powerful battle stance, energy burst`,
        work: `working hard, carrying items, determined`,
        happy: `very happy celebrating, sparkling eyes`,
        evolve: `evolving, transforming, brilliant light, divine power`,
        attack: `attacking fiercely, powerful strike, energy blast`,
    };
    const act = actPrompts[action] || '';
    const prompt = `${s.prefix} ${color.d} ${sp.base} spirit, ${act}, ${s.suffix}, detailed digital art, magical`;
    return imgUrl(prompt, pet.seed + hash(action), size, size);
}

function generateSpirit(forceRare = false) {
    let sp;
    if (forceRare || G.lucky) {
        // 稀有: 龙系优先
        const rare = DB.species.filter(s => s.el === 'dragon');
        sp = pick(rare.length ? rare : DB.species);
        G.lucky = false;
    } else {
        sp = pick(DB.species);
    }
    const color = pick(DB.colors);
    const feature = pick(DB.features);
    const bg = pick(DB.bgs);
    const pers = pick(DB.personalities);
    const title = pick(DB.titles);
    const seed = randInt(1, 999999);

    const spirit = {
        id: Date.now() + '_' + Math.random().toString(36).substr(2, 6),
        speciesId: sp.id, species: sp.name, element: sp.el,
        color: color.n, feature, bg,
        seed, name: `${color.n}${sp.name}`,
        personality: pers, title,
        level: 1, exp: 0, tier: 1,
        stats: { hp: 100, mood: 100, hunger: 100, energy: 100 },
        combat: { atk: randInt(20, 60), def: randInt(15, 50), spd: randInt(20, 55) },
        adoptDate: null, actionLog: [],
    };
    spirit.desc = `一只${color.n}色的${sp.name}, ${pers.d}。拥有${DB.elName[sp.el]}之力, ${title}。`;
    G.totalGen++;
    if (!G.discovered.includes(sp.name)) G.discovered.push(sp.name);
    saveGame();
    return spirit;
}

// ===== 页面导航 =====
function showPage(p) {
    document.querySelectorAll('.page').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(`page-${p}`)?.classList.add('active');
    document.querySelector(`.nav-btn[data-page="${p}"]`)?.classList.add('active');

    if (p === 'mypets') renderPets();
    if (p === 'shop') renderShop();
    if (p === 'merge') renderMergePage();
    if (p === 'tower') renderTower();
    if (p === 'home') { refreshUI(); loadHeroPreview(); }
    if (p === 'settings') loadSettings();
}

function refreshUI() {
    document.getElementById('petCount').textContent = G.pets.length;
    document.getElementById('goldDisplay').textContent = G.gold;
    // Home stats
    const hs = (id) => document.getElementById(id);
    if (hs('hsDiscovered')) hs('hsDiscovered').textContent = G.totalGen;
    if (hs('hsAdopted')) hs('hsAdopted').textContent = G.pets.length;
    if (hs('hsTower')) hs('hsTower').textContent = G.towerMax;
    if (hs('hsGold')) hs('hsGold').textContent = G.gold;
    if (hs('shopGold')) hs('shopGold').textContent = G.gold;
    if (hs('towerMax')) hs('towerMax').textContent = G.towerMax;
    if (hs('towerCur')) hs('towerCur').textContent = G.towerFloor;
}

function loadHeroPreview() {
    for (let i = 1; i <= 3; i++) {
        const s = generateSpirit();
        s.level = [1, 10, 20][i - 1];
        const el = document.getElementById(`hp${i}`);
        if (el) el.innerHTML = `<img src="${spiritImgUrl(s, 200)}" alt="">`;
    }
}

// ===== 探索 =====
function doExplore() {
    if (G.gold < 10) return toast('金币不足! 需要10💰', 'error');
    G.gold -= 10;
    const s = generateSpirit();
    G.curEnc = s;

    const area = document.getElementById('encounterArea');
    document.getElementById('multiArea').classList.add('hidden');
    area.classList.remove('hidden');

    const load = document.getElementById('encLoad');
    const img = document.getElementById('encImg');
    load.classList.remove('hidden');
    img.classList.remove('loaded');
    img.src = spiritImgUrl(s, 512);
    img.onload = () => { load.classList.add('hidden'); img.classList.add('loaded'); };

    const stg = DB.stages[0];
    document.getElementById('encStage').innerHTML = `<span class="stage-1">★ ${stg.name}体</span>`;

    document.getElementById('encInfo').innerHTML = `
        <h3 style="font-size:1.3rem;font-weight:700;margin-bottom:.3rem">${s.name}</h3>
        <div style="display:flex;gap:.3rem;flex-wrap:wrap;margin-bottom:.4rem">
            <span class="type-badge type-${s.element}">${DB.elIcon[s.element]} ${DB.elName[s.element]}</span>
            <span class="type-badge" style="background:rgba(255,255,255,.06);color:var(--dim);border:1px solid var(--bdr)">${s.personality.t}</span>
            <span class="type-badge" style="background:rgba(255,255,255,.06);color:var(--dim);border:1px solid var(--bdr)">T${s.tier}</span>
        </div>
        <p style="color:var(--dim);font-size:.9rem;margin-bottom:.6rem">${s.desc}</p>
        <div style="display:flex;gap:1rem;font-size:.85rem;color:var(--dim)">
            <span>⚔️ ${s.combat.atk}</span><span>🛡️ ${s.combat.def}</span><span>💨 ${s.combat.spd}</span>
        </div>
    `;
    saveGame(); refreshUI();
}

function doExploreMulti() {
    if (G.gold < 50) return toast('金币不足! 需要50💰', 'error');
    G.gold -= 50;
    document.getElementById('encounterArea').classList.add('hidden');
    const area = document.getElementById('multiArea');
    area.classList.remove('hidden');
    const grid = document.getElementById('multiGrid');
    grid.innerHTML = '';
    for (let i = 0; i < 6; i++) {
        const s = generateSpirit();
        grid.appendChild(makeCard(s, true));
    }
    saveGame(); refreshUI();
}

function makeCard(pet, showAdopt = false, showStatus = false) {
    const div = document.createElement('div');
    div.className = 'spirit-card';
    const stage = getStage(pet.level);
    const stgD = DB.stages[stage];
    let statusHtml = '';
    if (showStatus && pet.stats) {
        const hc = pet.stats.hp > 60 ? 's-good' : pet.stats.hp > 30 ? 's-mid' : 's-bad';
        const mc = pet.stats.mood > 60 ? 's-good' : pet.stats.mood > 30 ? 's-mid' : 's-bad';
        const fc = pet.stats.hunger > 60 ? 's-good' : pet.stats.hunger > 30 ? 's-mid' : 's-bad';
        statusHtml = `<div class="pet-status-bar">
            <div class="s-mini">❤️<div class="s-bar"><div class="s-fill ${hc}" style="width:${pet.stats.hp}%"></div></div></div>
            <div class="s-mini">😊<div class="s-bar"><div class="s-fill ${mc}" style="width:${pet.stats.mood}%"></div></div></div>
            <div class="s-mini">🍖<div class="s-bar"><div class="s-fill ${fc}" style="width:${pet.stats.hunger}%"></div></div></div>
        </div>`;
    }
    div.innerHTML = `
        <span class="card-level">⭐ Lv.${pet.level}</span>
        <span class="card-stage stage-${stage + 1}">${stgD.name}体</span>
        <img class="card-img" src="${spiritImgUrl(pet, 400)}" alt="${pet.name}" loading="lazy">
        <div class="card-body">
            <div class="card-name">${pet.name}</div>
            <div class="card-types">
                <span class="type-badge type-${pet.element}">${DB.elIcon[pet.element]} ${DB.elName[pet.element]}</span>
                ${pet.tier > 1 ? `<span class="type-badge" style="background:rgba(251,191,36,.15);color:var(--gold);border:1px solid rgba(251,191,36,.3)">T${pet.tier}</span>` : ''}
            </div>
            <div class="card-desc">${pet.desc || ''}</div>
        </div>
        ${statusHtml}
        ${showAdopt ? `<div class="card-actions">
            <button class="btn btn-adopt" onclick="adoptThis('${pet.id}')">💖 领养</button>
        </div>` : ''}
    `;
    if (!showAdopt) {
        div.onclick = () => openPetDetail(pet.id);
    }
    // 暂存精灵数据
    div._spirit = pet;
    return div;
}

// ===== 领养 =====
function adoptCurrent() {
    if (!G.curEnc) return;
    showAdoptModal(G.curEnc);
}

function adoptThis(id) {
    // 从多探索中领养
    const cards = document.querySelectorAll('#multiGrid .spirit-card');
    for (const c of cards) {
        if (c._spirit && c._spirit.id === id) {
            showAdoptModal(c._spirit);
            return;
        }
    }
}

function showAdoptModal(spirit) {
    G.curEnc = spirit;
    document.getElementById('adoptModal').classList.remove('hidden');
    document.getElementById('adoptImg').src = spiritImgUrl(spirit, 256);
    document.getElementById('adoptMsg').textContent = `${spirit.desc}`;
    document.getElementById('adoptName').value = spirit.name;
    document.getElementById('adoptName').focus();
}

function confirmAdopt() {
    const s = G.curEnc; if (!s) return;
    s.name = document.getElementById('adoptName').value.trim() || s.name;
    s.adoptDate = new Date().toISOString();
    s.actionLog = [{ t: new Date().toISOString(), a: '🎉 被领养了!' }];
    G.pets.push(s);
    G.curEnc = null;
    G.gold += 20; // 领养奖励
    closeAdopt();
    saveGame(); refreshUI();
    toast(`🎉 ${s.name} 加入了你的团队! +20💰`, 'success');
}

function closeAdopt() { document.getElementById('adoptModal').classList.add('hidden'); }

// ===== 仓库 =====
let petFilter = 'all';
function renderPets() {
    const grid = document.getElementById('petsGrid');
    const empty = document.getElementById('noPets');
    const pets = petFilter === 'all' ? G.pets : G.pets.filter(p => p.element === petFilter);
    if (G.pets.length === 0) { empty.style.display = ''; grid.innerHTML = ''; return; }
    empty.style.display = 'none';
    grid.innerHTML = '';
    pets.forEach(p => grid.appendChild(makeCard(p, false, true)));
}

function filterPets(el, btn) {
    petFilter = el;
    document.querySelectorAll('.filter-bar .filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderPets();
}

// ===== 精灵详情 =====
function openPetDetail(id) {
    const pet = G.pets.find(p => p.id === id);
    if (!pet) return;
    G.curPet = pet;
    const stage = getStage(pet.level);
    const stg = DB.stages[stage];

    document.getElementById('dImg').src = spiritImgUrl(pet, 600);
    document.getElementById('dStageBadge').innerHTML = `<span class="stage-${stage+1}">★ ${stg.name}体</span>`;
    document.getElementById('dElement').textContent = DB.elIcon[pet.element];
    document.getElementById('dName').textContent = pet.name;
    document.getElementById('dTitle').textContent = `「${pet.title}」 · T${pet.tier} · Lv.${pet.level}`;
    document.getElementById('dTypes').innerHTML = `
        <span class="type-badge type-${pet.element}">${DB.elIcon[pet.element]} ${DB.elName[pet.element]}</span>
        <span class="type-badge" style="background:rgba(255,255,255,.06);color:var(--dim);border:1px solid var(--bdr)">${pet.personality.t}</span>
    `;
    document.getElementById('dDesc').textContent = pet.desc;

    updateDetailStats(pet);
    renderEvoPreview(pet);
    renderLog(pet);

    document.getElementById('dynamicArea').classList.add('hidden');
    document.getElementById('petModal').classList.remove('hidden');
}

function updateDetailStats(pet) {
    const maxExp = pet.level * 80;
    document.getElementById('dStats').innerHTML = `
        <div class="stat-row"><span class="sl">❤️ 生命</span><div class="stat-bar"><div class="stat-fill sf-hp" style="width:${pet.stats.hp}%"></div></div><span class="sv">${Math.round(pet.stats.hp)}</span></div>
        <div class="stat-row"><span class="sl">😊 心情</span><div class="stat-bar"><div class="stat-fill sf-mood" style="width:${pet.stats.mood}%"></div></div><span class="sv">${Math.round(pet.stats.mood)}</span></div>
        <div class="stat-row"><span class="sl">🍖 饱食</span><div class="stat-bar"><div class="stat-fill sf-hunger" style="width:${pet.stats.hunger}%"></div></div><span class="sv">${Math.round(pet.stats.hunger)}</span></div>
        <div class="stat-row"><span class="sl">⚡ 体力</span><div class="stat-bar"><div class="stat-fill sf-energy" style="width:${pet.stats.energy}%"></div></div><span class="sv">${Math.round(pet.stats.energy)}</span></div>
        <div class="stat-row"><span class="sl">⭐ 经验</span><div class="stat-bar"><div class="stat-fill sf-exp" style="width:${pet.exp/maxExp*100}%"></div></div><span class="sv">${pet.exp}/${maxExp}</span></div>
        <div style="display:flex;gap:1rem;margin-top:.5rem;font-size:.85rem;color:var(--dim)">
            <span>⚔️攻击 ${pet.combat.atk}</span><span>🛡️防御 ${pet.combat.def}</span><span>💨速度 ${pet.combat.spd}</span>
        </div>
    `;
    document.getElementById('dLevel').innerHTML = `
        <span>等级:</span><span class="lv-badge">Lv.${pet.level}</span>
        <span style="color:var(--dim);font-size:.8rem;margin-left:auto">领养于 ${pet.adoptDate ? new Date(pet.adoptDate).toLocaleDateString('zh-CN') : '未知'}</span>
    `;
}

function renderEvoPreview(pet) {
    const curStage = getStage(pet.level);
    const container = document.getElementById('evoStages');
    container.innerHTML = '';
    const stageThresholds = [1, 5, 10, 15, 20];
    DB.stages.forEach((s, i) => {
        const unlocked = pet.level >= stageThresholds[i];
        const div = document.createElement('div');
        div.className = `evo-stage ${i === curStage ? 'current' : ''} ${!unlocked ? 'locked' : ''}`;
        div.innerHTML = `
            <img src="${spiritStageUrl(pet, i, 120)}" alt="${s.name}体" loading="lazy">
            <div class="evo-label stage-${i+1}">${s.name}体(Lv${stageThresholds[i]})</div>
        `;
        container.appendChild(div);
    });
}

function renderLog(pet) {
    const list = document.getElementById('dLog');
    list.innerHTML = '';
    (pet.actionLog || []).slice(-10).reverse().forEach(l => {
        const d = document.createElement('div');
        d.className = 'log-item';
        const t = new Date(l.t).toLocaleString('zh-CN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
        d.textContent = `[${t}] ${l.a}`;
        list.appendChild(d);
    });
}

// ===== 宠物互动 =====
function petAct(action) {
    const pet = G.curPet; if (!pet) return;
    const oldStage = getStage(pet.level);

    const acts = {
        feed: { log: '🍖 喂了食物', fx: { hunger: 15, mood: 5 }, gold: 0, exp: 5, msg: '喂了食物' },
        play: { log: '🎾 一起玩耍', fx: { mood: 25, hunger: -10, energy: -10 }, gold: 0, exp: 10, msg: '玩耍中~' },
        sleep: { log: '💤 休息了', fx: { energy: 35, hp: 10 }, gold: 0, exp: 3, msg: '睡了个好觉' },
        train: { log: '⚔️ 训练', fx: { energy: -20, hunger: -10 }, gold: 10, exp: 20, msg: '训练完成! +10💰', combat: true },
        work: { log: '💼 打工', fx: { energy: -25, mood: -5 }, gold: 30, exp: 8, msg: '打工赚钱! +30💰' },
        refresh: { log: '🎨 刷新外观', fx: {}, gold: -500, exp: 0, msg: '', isRefresh: true },
    };

    const act = acts[action]; if (!act) return;

    if (action === 'refresh') {
        if (G.gold < 500) return toast('金币不足! 需要500💰', 'error');
        if (!confirm(`花费500💰刷新 ${pet.name} 的外观?`)) return;
        G.gold -= 500;
        pet.seed = randInt(1, 999999);
        pet.feature = pick(DB.features);
        pet.bg = pick(DB.bgs);
        pet.actionLog.push({ t: new Date().toISOString(), a: '🎨 外观已刷新!' });
        saveGame(); refreshUI();
        document.getElementById('dImg').src = spiritImgUrl(pet, 600);
        renderEvoPreview(pet);
        toast(`${pet.name} 的外观焕然一新!`, 'success');
        updateDetailStats(pet); renderLog(pet);
        return;
    }

    // 检查体力
    if (act.fx.energy && act.fx.energy < 0 && pet.stats.energy < Math.abs(act.fx.energy)) {
        return toast('体力不足!让精灵休息一下吧', 'error');
    }

    // 应用效果
    for (const [k, v] of Object.entries(act.fx)) {
        if (pet.stats[k] !== undefined) pet.stats[k] = clamp(pet.stats[k] + v, 0, 100);
    }
    if (act.gold > 0) G.gold += act.gold;
    if (act.combat) {
        pet.combat.atk += randInt(0, 2);
        pet.combat.def += randInt(0, 1);
        pet.combat.spd += randInt(0, 1);
    }

    // 经验和升级
    addExp(pet, act.exp);
    pet.actionLog = pet.actionLog || [];
    pet.actionLog.push({ t: new Date().toISOString(), a: act.log });
    if (pet.actionLog.length > 50) pet.actionLog = pet.actionLog.slice(-50);

    const newStage = getStage(pet.level);
    if (newStage > oldStage) {
        toast(`✨ ${pet.name} 进化为 ${DB.stages[newStage].name}体! 外观大变!`, 'success');
        document.getElementById('dImg').src = spiritImgUrl(pet, 600);
        renderEvoPreview(pet);
        // 显示动态
        showDynamic(pet);
    }

    // 动作图动画
    if (action !== 'refresh') {
        const detailImg = document.getElementById('dImg');
        detailImg.src = spiritActionUrl(pet, action, 600);
        setTimeout(() => { detailImg.src = spiritImgUrl(pet, 600); }, 4000);
    }

    saveGame(); refreshUI();
    updateDetailStats(pet); renderLog(pet);
    if (act.msg) toast(act.msg, act.gold > 0 ? 'warning' : 'success');
}

function addExp(pet, amount) {
    pet.exp += amount;
    const maxExp = pet.level * 80;
    while (pet.exp >= maxExp) {
        pet.exp -= pet.level * 80;
        pet.level++;
        G.gold += 50;
        pet.combat.atk += randInt(2, 5);
        pet.combat.def += randInt(1, 4);
        pet.combat.spd += randInt(1, 3);
        toast(`🎉 ${pet.name} 升到 Lv.${pet.level}! +50💰`, 'success');
    }
}

function showDynamic(pet) {
    const area = document.getElementById('dynamicArea');
    const frames = document.getElementById('dynFrames');
    area.classList.remove('hidden');
    frames.innerHTML = '';
    ['happy', 'play', 'train', 'feed', 'sleep', 'evolve', 'attack'].forEach(a => {
        const f = document.createElement('div');
        f.className = 'dynamic-frame';
        f.innerHTML = `<img src="${spiritActionUrl(pet, a)}" loading="lazy" alt="${a}"><span class="fl">${
            { happy: '开心', play: '玩耍', train: '战斗', feed: '吃东西', sleep: '睡觉', evolve: '进化', attack: '攻击' }[a]
        }</span>`;
        frames.appendChild(f);
    });
}

function renamePet() {
    const pet = G.curPet; if (!pet) return;
    const n = prompt('新名字:', pet.name);
    if (n && n.trim()) {
        pet.name = n.trim(); saveGame();
        document.getElementById('dName').textContent = pet.name;
        toast(`改名为 "${pet.name}"`, 'info');
    }
}

function releasePet() {
    const pet = G.curPet; if (!pet) return;
    if (!confirm(`确定放生 ${pet.name}? 它将永远离去😢`)) return;
    G.pets = G.pets.filter(p => p.id !== pet.id);
    G.gold += 30;
    saveGame(); closePetModal(); refreshUI(); renderPets();
    toast(`${pet.name} 回归了自然... +30💰`, 'warning');
}

function closePetModal() { document.getElementById('petModal').classList.add('hidden'); G.curPet = null; }

// ===== 融合系统 =====
function renderMergePage() {
    G.mergeSlots = [null, null];
    renderMergeSlot(1); renderMergeSlot(2);
    document.getElementById('mergeResult').innerHTML = '<div class="merge-placeholder">融合结果将在这里显示</div>';
    document.getElementById('mergeBtn').disabled = true;
}

function renderMergeSlot(idx) {
    const slot = document.getElementById(`mergeSlot${idx}`);
    const pet = G.mergeSlots[idx - 1];
    if (!pet) {
        slot.innerHTML = '<div class="merge-placeholder">点击选择精灵</div>';
        slot.classList.remove('filled');
    } else {
        slot.innerHTML = `<div>
            <img src="${spiritImgUrl(pet, 250)}" style="width:100%;aspect-ratio:1;object-fit:cover">
            <div class="ms-info"><strong>${pet.name}</strong><br>Lv.${pet.level} · ${DB.elIcon[pet.element]} ${pet.species}</div>
        </div>`;
        slot.classList.add('filled');
    }
    checkMergeReady();
}

function checkMergeReady() {
    const [a, b] = G.mergeSlots;
    const btn = document.getElementById('mergeBtn');
    btn.disabled = !(a && b && a.level >= 5 && b.level >= 5 && a.id !== b.id && G.gold >= 200);
}

function openMergeSelect(idx) {
    G.mergeSelecting = idx;
    const grid = document.getElementById('mergeSelectGrid');
    grid.innerHTML = '';
    const otherId = G.mergeSlots[idx === 1 ? 1 : 0]?.id;
    const eligible = G.pets.filter(p => p.level >= 5 && p.id !== otherId);
    if (eligible.length === 0) {
        grid.innerHTML = '<p style="padding:2rem;text-align:center;color:var(--dim)">没有 Lv.5+ 的精灵可选</p>';
    }
    eligible.forEach(p => {
        const card = makeCard(p, false, true);
        card.onclick = () => {
            G.mergeSlots[idx - 1] = p;
            renderMergeSlot(idx);
            closeMergeSelect();
        };
        grid.appendChild(card);
    });
    document.getElementById('mergeSelectModal').classList.remove('hidden');
}

function closeMergeSelect() { document.getElementById('mergeSelectModal').classList.add('hidden'); }

function doMerge() {
    const [a, b] = G.mergeSlots;
    if (!a || !b || G.gold < 200) return;

    G.gold -= 200;
    const sameSpecies = a.speciesId === b.speciesId;
    let newPet;

    if (sameSpecies) {
        // 同种融合 → 进阶
        const newTier = Math.min(5, Math.max(a.tier, b.tier) + 1);
        newPet = { ...a };
        newPet.id = Date.now() + '_merge';
        newPet.tier = newTier;
        newPet.level = 1;
        newPet.exp = 0;
        newPet.seed = randInt(1, 999999);
        newPet.combat = {
            atk: Math.round((a.combat.atk + b.combat.atk) * 0.7),
            def: Math.round((a.combat.def + b.combat.def) * 0.7),
            spd: Math.round((a.combat.spd + b.combat.spd) * 0.7),
        };
        newPet.stats = { hp: 100, mood: 100, hunger: 100, energy: 100 };
        newPet.name = `T${newTier}·${a.species}`;
        newPet.desc = `由两只${a.species}融合而成的T${newTier}级精灵! 力量远超原体!`;
        newPet.actionLog = [{ t: new Date().toISOString(), a: `⚗️ 由 ${a.name} + ${b.name} 融合诞生!` }];
    } else {
        // 异种杂交 → 新物种!
        const newTier = Math.min(5, Math.max(a.tier, b.tier) + 1);
        const newName1 = a.species.substring(0, Math.ceil(a.species.length / 2));
        const newName2 = b.species.substring(Math.floor(b.species.length / 2));
        const hybridName = newName1 + newName2;
        const el = pick([a.element, b.element]);
        const spA = DB.species[a.speciesId];
        const spB = DB.species[b.speciesId];

        newPet = {
            id: Date.now() + '_hybrid',
            speciesId: a.speciesId, // 用第一个的base
            species: hybridName,
            element: el,
            color: pick(DB.colors).n,
            feature: pick(DB.features),
            bg: pick(DB.bgs),
            seed: randInt(1, 999999),
            name: hybridName,
            personality: pick(DB.personalities),
            title: pick(DB.titles),
            level: 1, exp: 0, tier: newTier,
            stats: { hp: 100, mood: 100, hunger: 100, energy: 100 },
            combat: {
                atk: Math.round((a.combat.atk + b.combat.atk) * 0.8),
                def: Math.round((a.combat.def + b.combat.def) * 0.8),
                spd: Math.round((a.combat.spd + b.combat.spd) * 0.8),
            },
            adoptDate: new Date().toISOString(),
            actionLog: [{ t: new Date().toISOString(), a: `⚗️ 由 ${a.name} + ${b.name} 杂交诞生!` }],
        };
        // 杂交的prompt用两个物种混合
        newPet._hybridBase = `${spA.base} mixed with ${spB.base} hybrid creature`;
        newPet.desc = `由${a.species}与${b.species}杂交而成的全新物种! T${newTier}级,拥有${DB.elName[el]}之力!`;
    }

    // 移除原精灵
    G.pets = G.pets.filter(p => p.id !== a.id && p.id !== b.id);
    G.gold += 150; // 奖励

    // 显示结果
    G._pendingMergePet = newPet;
    document.getElementById('mergeResultModal').classList.remove('hidden');
    document.getElementById('mergeTitle').textContent = sameSpecies ? '⚗️ 同种进阶成功!' : '🧬 杂交成功! 全新物种!';
    document.getElementById('mergeImg').src = spiritImgUrl(newPet, 256);
    document.getElementById('mergeMsg').textContent = newPet.desc;
    document.getElementById('mergeName').value = newPet.name;

    saveGame(); refreshUI();
}

function confirmMerge() {
    const pet = G._pendingMergePet; if (!pet) return;
    pet.name = document.getElementById('mergeName').value.trim() || pet.name;
    pet.adoptDate = new Date().toISOString();
    G.pets.push(pet);
    G._pendingMergePet = null;
    closeMergeResult();
    renderMergePage();
    saveGame(); refreshUI();
    toast(`🎉 ${pet.name} 诞生了! +150💰`, 'success');
}

function closeMergeResult() { document.getElementById('mergeResultModal').classList.add('hidden'); }

// 为杂交精灵特殊处理图片URL
const _origSpiritImgUrl = spiritImgUrl;
spiritImgUrl = function(pet, size) {
    if (pet._hybridBase) {
        const stage = getStage(pet.level);
        const s = DB.stages[stage];
        const color = DB.colors.find(c => c.n === pet.color) || DB.colors[0];
        const prompt = `${s.prefix} ${color.d} ${pet._hybridBase}, ${pet.feature || ''}, chibi fantasy creature, ${pet.bg || 'magical background'}, ${s.suffix}, detailed digital art, glowing, pokemon style`;
        return imgUrl(prompt, pet.seed, size, size);
    }
    return _origSpiritImgUrl(pet, size);
};

// ===== 冒险塔 =====
function renderTower() {
    document.getElementById('towerMax').textContent = G.towerMax;
    document.getElementById('towerCur').textContent = G.towerFloor;
    document.getElementById('battleScene').classList.add('hidden');
    document.getElementById('towerSelect').classList.remove('hidden');

    const grid = document.getElementById('towerSelectGrid');
    grid.innerHTML = '';
    if (G.pets.length === 0) {
        grid.innerHTML = '<p style="padding:2rem;text-align:center;color:var(--dim)">没有精灵可出战,先去探索领养吧!</p>';
        return;
    }
    G.pets.forEach(p => {
        const card = makeCard(p, false, true);
        card.onclick = () => startBattle(p);
        const btn = document.createElement('div');
        btn.className = 'card-actions';
        btn.innerHTML = `<button class="btn btn-primary" style="flex:1;justify-content:center">⚔️ 出战</button>`;
        btn.querySelector('button').onclick = (e) => { e.stopPropagation(); startBattle(p); };
        card.appendChild(btn);
        grid.appendChild(card);
    });
}

function generateEnemy(floor) {
    const isBoss = floor % 5 === 0;
    const bossData = DB.bosses.find(b => b.floor === floor);

    if (isBoss && bossData) {
        const hp = 100 + floor * 25;
        return {
            name: bossData.name, isBoss: true,
            prompt: `${bossData.prompt}, epic boss monster, menacing, dark fantasy, dramatic lighting, detailed, high quality digital art`,
            hp, maxHp: hp, atk: 20 + floor * 4, def: 10 + floor * 2, spd: 15 + floor * 2,
            seed: hash(bossData.name + floor),
            goldReward: floor * 30, expReward: floor * 15,
        };
    }

    const eligible = DB.enemies.filter(e => e.minFloor <= floor);
    const e = pick(eligible);
    const hp = 50 + floor * 15;
    const sceneSuffix = floor > 15 ? 'apocalyptic hellfire background' : floor > 10 ? 'dark dungeon lava' : floor > 5 ? 'dark forest night' : 'grassland field';
    return {
        name: e.name, isBoss: false,
        prompt: `${e.prompt} monster enemy, menacing aggressive, ${sceneSuffix}, fantasy game art, detailed, high quality`,
        hp, maxHp: hp, atk: 10 + floor * 3, def: 5 + floor * 2, spd: 10 + floor * 2,
        seed: randInt(1, 999999),
        goldReward: floor * 12, expReward: floor * 8,
    };
}

function startBattle(pet) {
    if (pet.stats.energy < 15) return toast('体力不足! 让精灵休息一下', 'error');

    G.battlePet = pet;
    const floor = G.towerFloor;
    const enemy = generateEnemy(floor);
    G.battleEnemy = enemy;

    const petMaxHP = 80 + pet.level * 20 + pet.combat.def * 2;
    G.battlePetHP = petMaxHP;
    G.battlePetMaxHP = petMaxHP;
    G.battleEnemyHP = enemy.hp;
    G.battleEnemyMaxHP = enemy.maxHp;
    G.battleActive = true;

    // 消耗体力
    pet.stats.energy = clamp(pet.stats.energy - 15, 0, 100);

    document.getElementById('towerSelect').classList.add('hidden');
    document.getElementById('battleScene').classList.remove('hidden');
    document.getElementById('battleResult').classList.add('hidden');
    document.getElementById('battleActions').classList.remove('hidden');
    document.getElementById('battleFloor').textContent = floor;

    document.getElementById('battlePetName').textContent = `${pet.name} (Lv.${pet.level})`;
    document.getElementById('battlePetImg').src = spiritActionUrl(pet, 'attack', 300);
    document.getElementById('battlePetStats').innerHTML = `⚔️${pet.combat.atk} 🛡️${pet.combat.def} 💨${pet.combat.spd}`;

    document.getElementById('battleEnemyName').textContent = `${enemy.name} ${enemy.isBoss ? '(BOSS!)' : ''}`;
    document.getElementById('battleEnemyImg').src = imgUrl(enemy.prompt, enemy.seed, 300, 300);

    updateBattleHP();
    document.getElementById('battleLog').innerHTML = `<p>⚔️ 第${floor}层 - ${enemy.isBoss ? '👹 BOSS ' : ''}${enemy.name} 出现了!</p>`;

    saveGame();
}

function updateBattleHP() {
    const petPct = Math.max(0, G.battlePetHP / G.battlePetMaxHP * 100);
    const ePct = Math.max(0, G.battleEnemyHP / G.battleEnemyMaxHP * 100);
    document.getElementById('battlePetHP').style.width = petPct + '%';
    document.getElementById('battleEnemyHP').style.width = ePct + '%';
    document.getElementById('battlePetHPText').textContent = `${Math.max(0, Math.round(G.battlePetHP))}/${G.battlePetMaxHP}`;
    document.getElementById('battleEnemyHPText').textContent = `${Math.max(0, Math.round(G.battleEnemyHP))}/${G.battleEnemyMaxHP}`;
}

function battleAttack() {
    if (!G.battleActive) return;
    const pet = G.battlePet;
    const enemy = G.battleEnemy;
    const log = document.getElementById('battleLog');

    // 玩家攻击
    const dmg = Math.max(1, pet.combat.atk + pet.level * 2 + randInt(-5, 10) - enemy.def * 0.3);
    G.battleEnemyHP -= dmg;
    log.innerHTML += `<p class="dmg">⚔️ ${pet.name} 攻击 ${enemy.name},造成 ${Math.round(dmg)} 伤害!</p>`;

    // 攻击动画
    const petSprite = document.getElementById('battlePetSprite');
    const enemySprite = document.getElementById('battleEnemySprite');
    petSprite.classList.add('atk-right');
    setTimeout(() => { petSprite.classList.remove('atk-right'); enemySprite.classList.add('hit'); }, 300);
    setTimeout(() => enemySprite.classList.remove('hit'), 700);

    updateBattleHP();

    if (G.battleEnemyHP <= 0) {
        setTimeout(() => {
            enemySprite.classList.add('ko');
            battleWin();
        }, 500);
        return;
    }

    // 敌人反击
    setTimeout(() => enemyTurn(), 800);
}

function battleSkill() {
    if (!G.battleActive) return;
    const pet = G.battlePet;
    const enemy = G.battleEnemy;
    const log = document.getElementById('battleLog');

    // 技能攻击: 更高伤害但消耗
    const dmg = Math.max(1, (pet.combat.atk + pet.level * 3) * 1.5 + randInt(0, 15) - enemy.def * 0.2);
    G.battleEnemyHP -= dmg;
    log.innerHTML += `<p class="dmg">✨ ${pet.name} 释放技能,造成 ${Math.round(dmg)} 伤害!</p>`;

    const petSprite = document.getElementById('battlePetSprite');
    const enemySprite = document.getElementById('battleEnemySprite');
    petSprite.classList.add('atk-right');
    setTimeout(() => { petSprite.classList.remove('atk-right'); enemySprite.classList.add('hit'); }, 200);
    setTimeout(() => enemySprite.classList.remove('hit'), 600);

    // 切换技能图
    document.getElementById('battlePetImg').src = spiritActionUrl(pet, 'evolve', 300);
    setTimeout(() => {
        document.getElementById('battlePetImg').src = spiritActionUrl(pet, 'attack', 300);
    }, 1500);

    updateBattleHP();

    if (G.battleEnemyHP <= 0) {
        setTimeout(() => {
            enemySprite.classList.add('ko');
            battleWin();
        }, 500);
        return;
    }

    setTimeout(() => enemyTurn(), 800);
}

function enemyTurn() {
    if (!G.battleActive) return;
    const pet = G.battlePet;
    const enemy = G.battleEnemy;
    const log = document.getElementById('battleLog');

    const dmg = Math.max(1, enemy.atk + randInt(-3, 8) - pet.combat.def * 0.4);
    G.battlePetHP -= dmg;
    log.innerHTML += `<p class="dmg">💥 ${enemy.name} 攻击 ${pet.name},造成 ${Math.round(dmg)} 伤害!</p>`;

    const petSprite = document.getElementById('battlePetSprite');
    const enemySprite = document.getElementById('battleEnemySprite');
    enemySprite.classList.add('atk-left');
    setTimeout(() => { enemySprite.classList.remove('atk-left'); petSprite.classList.add('hit'); }, 300);
    setTimeout(() => petSprite.classList.remove('hit'), 700);

    updateBattleHP();

    if (G.battlePetHP <= 0) {
        setTimeout(() => {
            petSprite.classList.add('ko');
            battleLose();
        }, 500);
    }

    log.scrollTop = log.scrollHeight;
}

function battleWin() {
    G.battleActive = false;
    const enemy = G.battleEnemy;
    const pet = G.battlePet;

    G.gold += enemy.goldReward;
    addExp(pet, enemy.expReward);
    pet.combat.atk += randInt(1, 3);
    pet.combat.def += randInt(0, 2);
    pet.actionLog.push({ t: new Date().toISOString(), a: `⚔️ 击败了第${G.towerFloor}层的${enemy.name}!` });

    G.towerFloor++;
    if (G.towerFloor > G.towerMax) G.towerMax = G.towerFloor;

    document.getElementById('battleActions').classList.add('hidden');
    const result = document.getElementById('battleResult');
    result.classList.remove('hidden');
    document.getElementById('battleResultTitle').textContent = '🎉 战斗胜利!';
    document.getElementById('battleResultTitle').style.color = '#34d399';
    document.getElementById('battleResultMsg').innerHTML = `
        击败 ${enemy.name}!<br>
        <span class="gold">+${enemy.goldReward} 💰</span> · <span class="heal">+${enemy.expReward} 经验</span>
    `;
    document.getElementById('battleResultBtn').textContent = '继续下一层';
    document.getElementById('battleResultBtn').onclick = () => {
        const nextEnemy = generateEnemy(G.towerFloor);
        G.battleEnemy = nextEnemy;
        G.battleEnemyHP = nextEnemy.hp;
        G.battleEnemyMaxHP = nextEnemy.maxHp;
        G.battlePetHP = Math.min(G.battlePetMaxHP, G.battlePetHP + G.battlePetMaxHP * 0.3);
        G.battleActive = true;
        document.getElementById('battleResult').classList.add('hidden');
        document.getElementById('battleActions').classList.remove('hidden');
        document.getElementById('battleFloor').textContent = G.towerFloor;
        document.getElementById('battleEnemyName').textContent = `${nextEnemy.name} ${nextEnemy.isBoss ? '(BOSS!)' : ''}`;
        document.getElementById('battleEnemyImg').src = imgUrl(nextEnemy.prompt, nextEnemy.seed, 300, 300);
        document.getElementById('battleEnemySprite').classList.remove('ko');
        document.getElementById('battleLog').innerHTML = `<p>⚔️ 第${G.towerFloor}层 - ${nextEnemy.isBoss ? '👹 BOSS ' : ''}${nextEnemy.name} 出现了!</p>`;
        updateBattleHP();
    };

    saveGame(); refreshUI();
}

function battleLose() {
    G.battleActive = false;
    const pet = G.battlePet;
    pet.stats.hp = clamp(pet.stats.hp - 20, 0, 100);
    pet.actionLog.push({ t: new Date().toISOString(), a: `💀 在第${G.towerFloor}层被击败了...` });

    document.getElementById('battleActions').classList.add('hidden');
    const result = document.getElementById('battleResult');
    result.classList.remove('hidden');
    document.getElementById('battleResultTitle').textContent = '💀 战斗失败...';
    document.getElementById('battleResultTitle').style.color = '#f87171';
    document.getElementById('battleResultMsg').textContent = `${pet.name} 倒下了... 回去休息恢复吧!`;
    document.getElementById('battleResultBtn').textContent = '返回';
    document.getElementById('battleResultBtn').onclick = () => renderTower();

    saveGame(); refreshUI();
}

function battleFlee() {
    if (!G.battleActive) return;
    G.battleActive = false;
    toast('成功逃跑!', 'info');
    renderTower();
}

// ===== 商店 =====
let shopFilter = 'all';
function renderShop() {
    document.getElementById('shopGold').textContent = G.gold;
    const grid = document.getElementById('shopGrid');
    grid.innerHTML = '';
    const items = shopFilter === 'all' ? SHOP : SHOP.filter(i => i.cat === shopFilter);
    items.forEach(item => {
        const owned = G.inventory[item.id] || 0;
        const div = document.createElement('div');
        div.className = 'shop-item';
        div.innerHTML = `
            <img class="shop-img" src="${imgUrl(item.prompt, hash(item.id), 400, 260)}" alt="${item.name}" loading="lazy">
            <div class="shop-body">
                <div class="shop-name">${item.name}</div>
                <div class="shop-desc">${item.desc}</div>
                ${owned > 0 ? `<div style="font-size:.75rem;color:var(--ok);margin-bottom:.3rem">背包: ${owned}个</div>` : ''}
                <div class="shop-footer">
                    <span class="shop-price">💰 ${item.price}</span>
                    <button class="btn btn-primary shop-buy" onclick="buyItem('${item.id}')">购买</button>
                </div>
            </div>
        `;
        grid.appendChild(div);
    });
}

function filterShop(cat, btn) {
    shopFilter = cat;
    document.querySelectorAll('.shop-categories .filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderShop();
}

function buyItem(itemId) {
    const item = SHOP.find(i => i.id === itemId);
    if (!item) return;
    if (G.gold < item.price) return toast('金币不足!', 'error');

    G.gold -= item.price;
    G.inventory[itemId] = (G.inventory[itemId] || 0) + 1;
    saveGame(); refreshUI(); renderShop();
    toast(`购买了 ${item.name}!`, 'success');

    // 直接使用
    if (G.pets.length > 0) {
        if (confirm(`立即对精灵使用 ${item.name}?`)) {
            openUseItem(itemId);
        }
    }
}

function openUseItem(itemId) {
    const item = SHOP.find(i => i.id === itemId);
    if (!item) return;
    if (!G.inventory[itemId] || G.inventory[itemId] <= 0) return toast('背包里没有这个物品', 'error');

    document.getElementById('useItemTitle').textContent = `使用 ${item.name} - 选择精灵`;
    const grid = document.getElementById('useItemGrid');
    grid.innerHTML = '';

    G.pets.forEach(p => {
        const card = makeCard(p, false, true);
        card.onclick = () => {
            useItemOnPet(itemId, p);
            closeUseItem();
        };
        grid.appendChild(card);
    });

    document.getElementById('useItemModal').classList.remove('hidden');
}

function useItemOnPet(itemId, pet) {
    const item = SHOP.find(i => i.id === itemId);
    if (!item || !G.inventory[itemId]) return;

    G.inventory[itemId]--;
    if (G.inventory[itemId] <= 0) delete G.inventory[itemId];

    // 应用效果
    for (const [k, v] of Object.entries(item.effect)) {
        if (pet.stats[k] !== undefined) {
            if (v === 100) pet.stats[k] = 100;
            else pet.stats[k] = clamp(pet.stats[k] + v, 0, 100);
        }
    }
    if (item.expBonus) addExp(pet, item.expBonus);
    if (item.lvBonus) {
        for (let i = 0; i < item.lvBonus; i++) {
            pet.level++;
            pet.combat.atk += randInt(2, 5);
            pet.combat.def += randInt(1, 4);
            pet.combat.spd += randInt(1, 3);
        }
    }
    if (item.isRefresh) {
        pet.seed = randInt(1, 999999);
        pet.feature = pick(DB.features);
        pet.bg = pick(DB.bgs);
    }
    if (item.isLucky) G.lucky = true;

    pet.actionLog = pet.actionLog || [];
    pet.actionLog.push({ t: new Date().toISOString(), a: `🎁 使用了 ${item.name}` });

    saveGame(); refreshUI(); renderShop();
    toast(`对 ${pet.name} 使用了 ${item.name}!`, 'success');
}

function closeUseItem() { document.getElementById('useItemModal').classList.add('hidden'); }

// ===== 状态衰减 =====
function tickStats() {
    G.pets.forEach(p => {
        p.stats.hunger = clamp(p.stats.hunger - 2, 0, 100);
        p.stats.mood = clamp(p.stats.mood - 1, 0, 100);
        p.stats.energy = clamp(p.stats.energy + 3, 0, 100);
        if (p.stats.hunger < 20) p.stats.hp = clamp(p.stats.hp - 1, 0, 100);
    });
    saveGame();
}

// ===== 粒子背景 =====
function initParticles() {
    const c = document.getElementById('particles');
    const ctx = c.getContext('2d');
    let pts = [];
    function resize() { c.width = innerWidth; c.height = innerHeight; }
    resize(); addEventListener('resize', resize);
    for (let i = 0; i < 50; i++) {
        pts.push({
            x: Math.random() * c.width, y: Math.random() * c.height,
            s: Math.random() * 2.5 + 1, dx: (Math.random() - .5) * .4, dy: (Math.random() - .5) * .4,
            o: Math.random() * .4 + .1,
            c: ['#a78bfa', '#06b6d4', '#f59e0b', '#ec4899'][~~(Math.random() * 4)],
        });
    }
    (function draw() {
        ctx.clearRect(0, 0, c.width, c.height);
        pts.forEach(p => {
            p.x += p.dx; p.y += p.dy;
            if (p.x < 0) p.x = c.width; if (p.x > c.width) p.x = 0;
            if (p.y < 0) p.y = c.height; if (p.y > c.height) p.y = 0;
            ctx.beginPath(); ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
            ctx.fillStyle = p.c; ctx.globalAlpha = p.o; ctx.fill();
            ctx.beginPath(); ctx.arc(p.x, p.y, p.s * 3, 0, Math.PI * 2);
            ctx.globalAlpha = p.o * .12; ctx.fill();
        });
        ctx.globalAlpha = 1;
        requestAnimationFrame(draw);
    })();
}

// ===== 工具 =====
function pick(a) { return a[~~(Math.random() * a.length)]; }
function randInt(a, b) { return ~~(Math.random() * (b - a + 1)) + a; }
function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
function hash(s) { let h = 0; for (let i = 0; i < s.length; i++) { h = ((h << 5) - h) + s.charCodeAt(i); h |= 0; } return Math.abs(h); }
function toast(msg, type = 'info') {
    const w = document.getElementById('toastWrap');
    const t = document.createElement('div');
    t.className = `toast toast-${type}`;
    t.textContent = msg;
    w.appendChild(t);
    setTimeout(() => t.remove(), 3100);
}

// ===== 启动 =====
document.addEventListener('DOMContentLoaded', init);
