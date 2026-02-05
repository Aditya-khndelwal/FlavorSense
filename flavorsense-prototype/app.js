const flavors = [
  { name: "Sweet", vibe: "Comforting" },
  { name: "Spicy", vibe: "Bold" },
  { name: "Umami", vibe: "Savory" },
  { name: "Smoky", vibe: "Deep" },
  { name: "Citrus", vibe: "Bright" },
  { name: "Herbal", vibe: "Fresh" },
  { name: "Earthy", vibe: "Grounded" },
  { name: "Nutty", vibe: "Toasty" },
  { name: "Floral", vibe: "Aromatic" }
];

const recipes = [
  {
    name: "Spicy Ramen",
    match: 92,
    flavors: ["Spicy", "Umami", "Smoky"],
    ingredients: ["Chili paste", "Miso", "Scallions", "Soft egg"],
    steps: [
      "Sauté chili paste and miso in a splash of oil until fragrant.",
      "Add broth and simmer to deepen the flavor.",
      "Cook noodles separately, then add to the broth.",
      "Top with scallions and a soft egg before serving."
    ],
    prep: "15 min",
    cook: "20 min",
    serves: "2",
    calories: "520",
    mood: "Spicy + Umami + Smoky"
  },
  {
    name: "Lemon Herb Chicken",
    match: 87,
    flavors: ["Citrus", "Herbal", "Umami"],
    ingredients: ["Lemon", "Garlic", "Thyme", "Olive oil"],
    steps: [
      "Marinate chicken with lemon, garlic, thyme, olive oil, and salt.",
      "Sear in a hot skillet until golden on both sides.",
      "Cover or finish in the oven until cooked through.",
      "Rest, slice, and spoon the pan juices over top."
    ],
    prep: "10 min",
    cook: "22 min",
    serves: "2",
    calories: "430",
    mood: "Citrus + Herbal + Light Umami"
  },
  {
    name: "Crispy Tofu Bowl",
    match: 83,
    flavors: ["Umami", "Earthy", "Herbal"],
    ingredients: ["Tofu", "Sesame", "Ginger", "Greens"],
    steps: [
      "Press and cube the tofu, then toss with sesame and salt.",
      "Pan-fry until all sides are crisp and golden.",
      "Toss greens with a ginger-forward dressing.",
      "Assemble the bowl and drizzle with extra sauce."
    ],
    prep: "12 min",
    cook: "15 min",
    serves: "2",
    calories: "380",
    mood: "Savory + Earthy + Fresh"
  },
  {
    name: "Thai Basil Stir Fry",
    match: 81,
    flavors: ["Herbal", "Spicy", "Umami"],
    ingredients: ["Basil", "Chili", "Soy", "Garlic"],
    steps: [
      "Sizzle garlic and chili in hot oil for a few seconds.",
      "Add your veggies or protein and stir-fry quickly.",
      "Splash in soy sauce and toss to coat.",
      "Fold in basil until just wilted."
    ],
    prep: "8 min",
    cook: "10 min",
    serves: "2",
    calories: "360",
    mood: "Herbal + Spicy + Umami"
  },
  {
    name: "Herb Roasted Chicken",
    match: 88,
    flavors: ["Herbal", "Umami"],
    ingredients: ["Rosemary", "Garlic", "Butter"],
    steps: [
      "Rub chicken with rosemary, garlic, butter, salt, and pepper.",
      "Roast until golden and the juices run clear.",
      "Baste once or twice for extra flavor.",
      "Rest before carving to keep it juicy."
    ],
    prep: "10 min",
    cook: "35 min",
    serves: "3",
    calories: "540",
    mood: "Herbal + Savory"
  },
  {
    name: "Garlic Butter Chicken",
    match: 82,
    flavors: ["Umami", "Smoky"],
    ingredients: ["Garlic", "Butter", "Paprika"],
    steps: [
      "Sear chicken until golden on both sides.",
      "Add butter, garlic, and paprika to the pan.",
      "Spoon the sauce over the chicken and simmer to finish.",
      "Sprinkle herbs and serve hot."
    ],
    prep: "8 min",
    cook: "18 min",
    serves: "2",
    calories: "510",
    mood: "Savory + Rich"
  }
];

const recentlyTried = [
  "Tomato Basil Soup",
  "Garlic Butter Shrimp",
  "Miso Glazed Eggplant",
  "Coconut Lime Curry"
];

const screens = document.querySelectorAll(".screen");
const flavorChips = document.getElementById("flavorChips");
const mixList = document.getElementById("mixList");
const dailyMix = document.getElementById("dailyMix");
const discoveryMix = document.getElementById("discoveryMix");
const recentlyTriedEl = document.getElementById("recentlyTried");
const continueToMix = document.getElementById("continueToMix");
const navButtons = document.querySelectorAll("[data-nav]");

let selectedFlavors = [];

function updateNavActive(id) {
  navButtons.forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-nav") === id);
  });
}

function setActiveScreen(id) {
  screens.forEach(screen => {
    screen.classList.toggle("active", screen.id === id);
  });
  if (["welcome", "home", "explore", "recipe"].includes(id)) {
    updateNavActive(id);
  }
}

function renderFlavorChips() {
  flavorChips.innerHTML = "";
  flavors.forEach(flavor => {
    const chip = document.createElement("button");
    chip.className = "chip";
    chip.innerHTML = `<span>${flavor.name}</span><span class="muted">${flavor.vibe}</span>`;
    chip.addEventListener("click", () => toggleFlavor(flavor.name, chip));
    flavorChips.appendChild(chip);
  });
}

function toggleFlavor(name, chip) {
  if (selectedFlavors.includes(name)) {
    selectedFlavors = selectedFlavors.filter(f => f !== name);
    chip.classList.remove("active");
  } else {
    selectedFlavors.push(name);
    chip.classList.add("active");
  }
  continueToMix.disabled = selectedFlavors.length < 3;
}

function buildMix() {
  const weights = selectedFlavors.map((flavor, index) => {
    const weight = Math.max(10, 40 - index * 8);
    return { flavor, weight };
  });
  const total = weights.reduce((sum, item) => sum + item.weight, 0);
  return weights.map(item => ({
    flavor: item.flavor,
    percent: Math.round((item.weight / total) * 100)
  }));
}

function renderMix() {
  const mix = buildMix();
  mixList.innerHTML = "";
  mix.forEach(item => {
    const row = document.createElement("div");
    row.className = "mix-card";
    row.innerHTML = `
      <strong>${item.flavor} Mix</strong>
      <div class="progress"><span style="width:${item.percent}%"></span></div>
      <span class="muted">${item.percent}%</span>
    `;
    mixList.appendChild(row);
  });
}

function scoreRecipe(recipe) {
  const matchCount = recipe.flavors.filter(f => selectedFlavors.includes(f)).length;
  return Math.min(98, 60 + matchCount * 12 + Math.round(Math.random() * 8));
}

function renderRecipes() {
  const scored = recipes.map(recipe => ({
    ...recipe,
    score: scoreRecipe(recipe)
  })).sort((a, b) => b.score - a.score);

  dailyMix.innerHTML = "";
  discoveryMix.innerHTML = "";

  scored.slice(0, 2).forEach(recipe => dailyMix.appendChild(recipeCard(recipe)));
  scored.slice(2, 4).forEach(recipe => discoveryMix.appendChild(recipeCard(recipe)));
}

function recipeCard(recipe) {
  const card = document.createElement("div");
  card.className = "recipe-card";
  card.innerHTML = `
    <strong>${recipe.name}</strong>
    <span class="muted">${recipe.score}% match</span>
    <span class="muted">${recipe.mood}</span>
    <button class="ghost" data-recipe="${recipe.name}">Open Recipe</button>
  `;
  card.querySelector("button").addEventListener("click", () => openRecipe(recipe));
  return card;
}

function renderRecentlyTried() {
  recentlyTriedEl.innerHTML = "";
  recentlyTried.forEach(item => {
    const pill = document.createElement("div");
    pill.className = "pill";
    pill.textContent = item;
    recentlyTriedEl.appendChild(pill);
  });
}

function openRecipe(recipe) {
  document.getElementById("recipeTitle").textContent = recipe.name;
  document.getElementById("recipeMood").textContent = recipe.mood;
  document.getElementById("recipeScore").textContent = `${recipe.score}% Match`;

  const tags = document.getElementById("recipeTags");
  tags.innerHTML = "";
  recipe.flavors.forEach(tag => {
    const chip = document.createElement("span");
    chip.className = "pill";
    chip.textContent = tag;
    tags.appendChild(chip);
  });

  const ingredients = document.getElementById("recipeIngredients");
  ingredients.innerHTML = "";
  recipe.ingredients.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    ingredients.appendChild(li);
  });

  const steps = document.getElementById("recipeSteps");
  steps.innerHTML = "";
  (recipe.steps || []).forEach(step => {
    const li = document.createElement("li");
    li.textContent = step;
    steps.appendChild(li);
  });

  const recipeTime = document.getElementById("recipeTime");
  const recipeServings = document.getElementById("recipeServings");
  const recipeCalories = document.getElementById("recipeCalories");
  const prep = recipe.prep || "-";
  const cook = recipe.cook || "-";
  recipeTime.textContent = `${prep} + ${cook}`;
  recipeServings.textContent = recipe.serves || "-";
  recipeCalories.textContent = recipe.calories ? `${recipe.calories} kcal` : "-";

  const similar = document.getElementById("similarRecipes");
  similar.innerHTML = "";
  recipes.filter(r => r.name !== recipe.name).slice(0, 2).forEach(item => {
    similar.appendChild(recipeCard({
      ...item,
      score: scoreRecipe(item)
    }));
  });

  setActiveScreen("recipe");
}

function wireNav() {
  document.querySelectorAll("[data-next]").forEach(btn => {
    btn.addEventListener("click", () => {
      const next = btn.getAttribute("data-next");
      if (next === "mix") {
        renderMix();
      }
      if (next === "home") {
        renderRecipes();
        renderRecentlyTried();
      }
      setActiveScreen(next);
    });
  });

  document.querySelectorAll("[data-prev]").forEach(btn => {
    btn.addEventListener("click", () => {
      setActiveScreen(btn.getAttribute("data-prev"));
    });
  });

  navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-nav");
      if (target === "home") {
        renderRecipes();
        renderRecentlyTried();
      }
      setActiveScreen(target);
    });
  });

  continueToMix.addEventListener("click", () => {
    renderMix();
    setActiveScreen("mix");
  });
}

renderFlavorChips();
wireNav();
updateNavActive("welcome");




