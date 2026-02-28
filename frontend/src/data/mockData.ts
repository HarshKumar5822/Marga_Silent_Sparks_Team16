// Mock data for CodeQuest challenges and user progress

export interface Challenge {
  id?: string;
  _id?: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  xpReward: number;
  isLocked: boolean;
  isCompleted: boolean;
  category: string;
  type?: string;
  steps: ChallengeStep[];
  translations?: {
    [lang: string]: {
      [stepId: number]: {
        instruction: string;
        hint: string;
      };
    };
  };
}

export interface ChallengeStep {
  id: number;
  instruction: string;
  hint: string;
  expectedCode: string[];
  visualizationType: 'node-create' | 'node-link' | 'node-traverse' | 'complete' | 'console';
}

export interface UserProgress {
  level: number;
  currentXP: number;
  totalXP: number;
  xpToNextLevel: number;
  completedChallenges: string[];
  badges: Badge[];
  streak: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt?: Date;
  isEarned: boolean;
}

const generateBadges = (): Badge[] => {
  const tiers = ['Bronze', 'Silver', 'Gold', 'Platinum'];
  const actions = ['Solver', 'Streak', 'Helper', 'Reviewer', 'Bug Hunter'];

  const generated: Badge[] = [
    { id: 'first-step', name: 'First Steps', description: 'Complete your first challenge', icon: '🎯', isEarned: true, earnedAt: new Date() },
    { id: 'linked-master', name: 'Linked Master', description: 'Master linked list operations', icon: '🔗', isEarned: true, earnedAt: new Date() },
    { id: 'speed-demon', name: 'Speed Demon', description: 'Complete 5 challenges in one day', icon: '⚡', isEarned: false },
    { id: 'perfectionist', name: 'Perfectionist', description: 'Complete 10 challenges without hints', icon: '💎', isEarned: false },
    { id: 'tree-hugger', name: 'Tree Hugger', description: 'Master binary tree operations', icon: '🌳', isEarned: false },
    { id: 'algo-wizard', name: 'Algorithm Wizard', description: 'Complete all sorting challenges', icon: '🧙', isEarned: false },
  ];

  let idCounter = 1;
  for (const action of actions) {
    for (const tier of tiers) {
      generated.push({
        id: `badge-${action.toLowerCase()}-${tier.toLowerCase()}`,
        name: `${tier} ${action}`,
        description: `Achieve ${tier} level in ${action} activities`,
        icon: tier === 'Bronze' ? '🥉' : tier === 'Silver' ? '🥈' : tier === 'Gold' ? '🥇' : '🏆',
        isEarned: Math.random() > 0.7, // 30% chance to have earned it
        earnedAt: Math.random() > 0.7 ? new Date() : undefined,
      });
    }
  }

  // Fill up to ~70 with generic milestones
  for (let i = generated.length; i < 70; i++) {
    generated.push({
      id: `milestone-${i}`,
      name: `Milestone ${i}`,
      description: `Unlock milestone ${i} by completing tasks`,
      icon: '🎖️',
      isEarned: Math.random() > 0.9,
    });
  }

  return generated;
};

export const mockUser: UserProgress = {
  level: 5,
  currentXP: 2450,
  totalXP: 12450,
  xpToNextLevel: 3000,
  completedChallenges: ['challenge-1', 'challenge-2', 'challenge-3'],
  badges: generateBadges(),
  streak: 7,
};

export const linkedListChallenge: Challenge = {
  id: 'linked-list-intro',
  title: 'Introduction to Linked Lists',
  description: 'Learn how to create and connect nodes in a singly linked list',
  difficulty: 'beginner',
  xpReward: 150,
  isLocked: false,
  isCompleted: false,
  category: 'Data Structures',
  steps: [
    {
      id: 1,
      instruction: 'Create a new node structure with data and next pointer',
      hint: 'A node needs to store both its value and a reference to the next node. In Python, use `__init__` to initialize `self.data` and `self.next`.',
      expectedCode: ['struct Node', 'class Node', 'data', 'next'],
      visualizationType: 'node-create',
    },
    {
      id: 2,
      instruction: 'Assign a value to your node\'s data field',
      hint: 'Set the data property to store a value like 42. `node = Node(42)`',
      expectedCode: ['data =', 'data:', 'value'],
      visualizationType: 'node-create',
    },
    {
      id: 3,
      instruction: 'Create a second node and link it to the first',
      hint: 'Create a new node (e.g., with value 10) and set `first_node.next = second_node`. This creates the chain.',
      expectedCode: ['next =', 'next:', '->next', '.next'],
      visualizationType: 'node-link',
    },
    {
      id: 4,
      instruction: 'Traverse the linked list to print all values',
      hint: 'Use a while loop: `current = head`. While `current` is not None, print `current.data` and move to `current.next`.',
      expectedCode: ['while', 'current', 'null', 'None', 'nullptr'],
      visualizationType: 'node-traverse',
    },
    {
      id: 5,
      instruction: 'Insert a node at the beginning (Head)',
      hint: 'Create a new node. Set its next pointer to the current head. Update head to be the new node.',
      expectedCode: ['head', 'next'],
      visualizationType: 'node-link',
    },
    {
      id: 6,
      instruction: 'Delete the last node',
      hint: 'Traverse to the second-to-last node (where `current.next.next` is None). Set `current.next` to None.',
      expectedCode: ['next', 'None', 'null'],
      visualizationType: 'node-traverse',
    }
  ],
  translations: {
    hi: {
      1: {
        instruction: 'डेटा और अगले पॉइंटर के साथ एक नई नोड संरचना बनाएं',
        hint: 'एक नोड को अपने मूल्य और अगले नोड के संदर्भ दोनों को संग्रहीत करने की आवश्यकता होती है। पायथन में, `self.data` और `self.next` को प्रारंभ करने के लिए `__init__` का उपयोग करें।',
      },
      2: {
        instruction: 'अपने नोड के डेटा फ़ील्ड को एक मान असाइन करें',
        hint: '42 जैसे मान को संग्रहीत करने के लिए डेटा प्रॉपर्टी सेट करें। `node = Node(42)`',
      },
      3: {
        instruction: 'एक दूसरा नोड बनाएं और इसे पहले से लिंक करें',
        hint: 'एक नया नोड बनाएं (उदाहरण के लिए, मान 10 के साथ) और `first_node.next = second_node` सेट करें। यह श्रृंखला बनाता है।',
      },
      4: {
        instruction: 'सभी मानों को प्रिंट करने के लिए लिंक्ड सूची को पार करें',
        hint: 'एक while लूप का उपयोग करें: `current = head`। जब तक `current` None नहीं है, `current.data` प्रिंट करें और `current.next` पर जाएं।',
      },
      5: {
        instruction: 'शुरुआत (Head) में एक नोड डालें',
        hint: 'एक नया नोड बनाएं। इसके अगले पॉइंटर को वर्तमान हेड पर सेट करें। हेड को नए नोड होने के लिए अपडेट करें।',
      },
      6: {
        instruction: 'अंतिम नोड को हटाएं',
        hint: 'दूसरे-से-अंतिम नोड तक जाएं (जहां `current.next.next` None है)। `current.next` को None पर सेट करें।',
      }
    },
    es: {
      1: {
        instruction: 'Crea una nueva estructura de nodo con datos y puntero siguiente',
        hint: 'Un nodo necesita almacenar tanto su valor como una referencia al siguiente nodo. En Python, usa `__init__` para inicializar `self.data` y `self.next`.',
      },
      2: {
        instruction: 'Asigna un valor al campo de datos de tu nodo',
        hint: 'Establece la propiedad de datos para almacenar un valor como 42. `node = Node(42)`',
      },
      3: {
        instruction: 'Crea un segundo nodo y enlázalo al primero',
        hint: 'Crea un nuevo nodo (por ejemplo, con valor 10) y establece `first_node.next = second_node`. Esto crea la cadena.',
      },
      4: {
        instruction: 'Recorre la lista enlazada para imprimir todos los valores',
        hint: 'Usa un bucle while: `current = head`. Mientras `current` no sea None, imprime `current.data` y muévete a `current.next`.',
      },
      5: {
        instruction: 'Inserta un nodo al principio (Head)',
        hint: 'Crea un nuevo nodo. Establece su puntero siguiente al head actual. Actualiza head para que sea el nuevo nodo.',
      },
      6: {
        instruction: 'Elimina el último nodo',
        hint: 'Recorre hasta el penúltimo nodo (donde `current.next.next` es None). Establece `current.next` a None.',
      }
    },
    fr: {
      1: {
        instruction: 'Créer une nouvelle structure de nœud avec des données et un pointeur suivant',
        hint: 'Un nœud doit stocker à la fois sa valeur et une référence au nœud suivant. En Python, utilisez `__init__` pour initialiser `self.data` et `self.next`.',
      },
      2: {
        instruction: 'Attribuer une valeur au champ de données de votre nœud',
        hint: 'Définissez la propriété de données pour stocker une valeur comme 42. `node = Node(42)`',
      },
      3: {
        instruction: 'Créer un deuxième nœud et le lier au premier',
        hint: 'Créez un nouveau nœud (par exemple, avec la valeur 10) et définissez `first_node.next = second_node`. Cela crée la chaîne.',
      },
      4: {
        instruction: 'Parcourir la liste chaînée pour imprimer toutes les valeurs',
        hint: 'Utilisez une boucle while : `current = head`. Tant que `current` n\'est pas None, imprimez `current.data` et passez à `current.next`.',
      },
      5: {
        instruction: 'Insérer un nœud au début (Head)',
        hint: 'Créez un nouveau nœud. Définissez son pointeur suivant sur la tête actuelle. Mettez à jour la tête pour qu\'elle soit le nouveau nœud.',
      },
      6: {
        instruction: 'Supprimer le dernier nœud',
        hint: 'Parcourez jusqu\'à l\'avant-dernier nœud (où `current.next.next` est None). Définissez `current.next` à None.',
      }
    },
    te: {
      1: {
        instruction: 'డేటా మరియు తదుపరి పాయింటర్‌తో కొత్త నోడ్ నిర్మాణాన్ని సృష్టించండి',
        hint: 'నోడ్ తన విలువను మరియు తదుపరి నోడ్ యొక్క రిఫరెన్స్‌ను నిల్వ చేయాలి. Pythonలో, `__init__` ఉపయోగించండి.',
      },
      2: {
        instruction: 'మీ నోడ్ యొక్క డేటా ఫీల్డ్‌కు విలువను కేటాయించండి',
        hint: 'విలువను నిల్వ చేయడానికి డేటా ప్రాపర్టీని సెట్ చేయండి (ఉదా. 42). `node = Node(42)`',
      },
      3: {
        instruction: 'రెండవ నోడ్‌ను సృష్టించండి మరియు దానిని మొదటిదానికి లింక్ చేయండి',
        hint: 'క్రొత్త నోడ్‌ను సృష్టించండి (ఉదా. విలువ 10తో) మరియు `first_node.next = second_node` అని సెట్ చేయండి.',
      },
      4: {
        instruction: 'అన్ని విలువలను ముద్రించడానికి లింక్ చేయబడిన జాబితాను ట్రావర్స్ చేయండి',
        hint: 'while లూప్ ఉపయోగించండి: `current = head`. `current` None కానంత వరకు, `current.data` ప్రింట్ చేయండి.',
      },
      5: {
        instruction: 'ప్రారంభంలో (Head) ఒక నోడ్‌ను చొప్పించండి',
        hint: 'క్రొత్త నోడ్‌ను సృష్టించండి. దాని తదుపరి పాయింటర్‌ను ప్రస్తుత హెడ్‌కు సెట్ చేయండి.',
      },
      6: {
        instruction: 'చివరి నోడ్‌ను తొలగించండి',
        hint: 'చివరికి ముందున్న నోడ్ వరకు వెళ్ళండి (అక్కడ `current.next.next` None). `current.next` ని None చేయండి.',
      }
    }
  },

};



export const sortingChallenge: Challenge = {
  id: 'bubble-sort-intro',
  title: 'Sorting: Planetary Alignment',
  description: 'Master Bubble Sort by aligning planets according to their gravitational mass.',
  difficulty: 'beginner',
  xpReward: 150,
  isLocked: false,
  isCompleted: false,
  category: 'Algorithms',
  steps: [
    {
      id: 1,
      instruction: 'Create an array of planet masses to sort',
      hint: 'Define an array with unsorted numbers: `masses = [50, 20, 80, 10]`',
      expectedCode: ['[', ',', ']'],
      visualizationType: 'node-create',
    },
    {
      id: 2,
      instruction: 'Compare the first two planets',
      hint: 'Access elements at index 0 and 1. `if masses[0] > masses[1]:`',
      expectedCode: ['if', '>', '[0]', '[1]'],
      visualizationType: 'console',
    },
    {
      id: 3,
      instruction: 'Swap the planets if the first is heavier',
      hint: 'Use a temporary variable or tuple unpacking to swap: `masses[0], masses[1] = masses[1], masses[0]`',
      expectedCode: ['=', ','],
      visualizationType: 'node-link', // Reusing link type for swap approx
    },
    {
      id: 4,
      instruction: 'Iterate through the entire system to fully align',
      hint: 'Use nested loops to complete the bubble sort algorithm.',
      expectedCode: ['for', 'while', 'len'],
      visualizationType: 'node-traverse',
    }
  ],
  translations: {
    hi: {
      1: { instruction: 'सॉर्ट करने के लिए ग्रह द्रव्यमान की एक सरणी बनाएं', hint: 'अनसॉर्टेड नंबरों के साथ एक सरणी परिभाषित करें: `masses = [50, 20, 80, 10]`' },
      2: { instruction: 'पहले दो ग्रहों की तुलना करें', hint: 'इंडेक्स 0 और 1 पर तत्वों तक पहुँचें। `if masses[0] > masses[1]:`' },
      3: { instruction: 'यदि पहला भारी है तो ग्रहों की अदला-बदली करें', hint: 'स्वैप करने के लिए अस्थायी चर का उपयोग करें: `masses[0], masses[1] = masses[1], masses[0]`' },
      4: { instruction: 'सिस्टम को पूरी तरह से संरेखित करने के लिए पुनरावृति करें', hint: 'बबल सॉर्ट एल्गोरिदम को पूरा करने के लिए नेस्टेड लूप का उपयोग करें।' }
    },
    es: {
      1: { instruction: 'Crea una matriz de masas planetarias para ordenar', hint: 'Define una matriz con números desordenados: `masses = [50, 20, 80, 10]`' },
      2: { instruction: 'Compara los dos primeros planetas', hint: 'Accede a los elementos en el índice 0 y 1. `if masses[0] > masses[1]:`' },
      3: { instruction: 'Intercambia los planetas si el primero es más pesado', hint: 'Usa una variable temporal para intercambiar: `masses[0], masses[1] = masses[1], masses[0]`' },
      4: { instruction: 'Itera a través de todo el sistema para alinear completamente', hint: 'Usa bucles anidados para completar el algoritmo de ordenamiento de burbuja.' }
    },
    fr: {
      1: { instruction: 'Créer un tableau de masses planétaires à trier', hint: 'Définissez un tableau avec des nombres non triés : `masses = [50, 20, 80, 10]`' },
      2: { instruction: 'Comparer les deux premières planètes', hint: 'Accédez aux éléments aux index 0 et 1. `if masses[0] > masses[1]:`' },
      3: { instruction: 'Échanger les planètes si la première est plus lourde', hint: 'Utilisez une variable temporaire pour échanger : `masses[0], masses[1] = masses[1], masses[0]`' },
      4: { instruction: 'Parcourir tout le système pour aligner complètement', hint: 'Utilisez des boucles imbriquées pour compléter l\'algorithme de tri à bulles.' }
    }
  }
};

export const treeChallenge: Challenge = {
  id: 'bst-intro',
  title: 'Trees: Stellar Constellations',
  description: 'Map out the galaxy using Binary Search Trees to organize star systems.',
  difficulty: 'intermediate',
  xpReward: 200,
  isLocked: false,
  isCompleted: false,
  category: 'Data Structures', // We can differentiate by ID or sub-category logic
  steps: [
    {
      id: 1,
      instruction: 'Create the primary star (Root)',
      hint: 'Create a Node with a value. This will be the center of your constellation.',
      expectedCode: ['Node', 'root'],
      visualizationType: 'node-create',
    },
    {
      id: 2,
      instruction: 'Insert a smaller star to the left',
      hint: 'If the new value is less than the root, assign it to `root.left`.',
      expectedCode: ['left', '<'],
      visualizationType: 'node-link',
    },
    {
      id: 3,
      instruction: 'Insert a larger star to the right',
      hint: 'If the new value is greater than the root, assign it to `root.right`.',
      expectedCode: ['right', '>'],
      visualizationType: 'node-link',
    }
  ],
  translations: {
    hi: {
      1: { instruction: 'प्राथमिक तारा (रूट) बनाएं', hint: 'एक मान के साथ एक नोड बनाएं। यह आपके नक्षत्र का केंद्र होगा।' },
      2: { instruction: 'बाईं ओर एक छोटा तारा डालें', hint: 'यदि नया मान रूट से कम है, तो इसे `root.left` पर असाइन करें।' },
      3: { instruction: 'दाईं ओर एक बड़ा तारा डालें', hint: 'यदि नया मान रूट से बड़ा है, तो इसे `root.right` पर असाइन करें।' }
    },
    es: {
      1: { instruction: 'Crea la estrella primaria (Raíz)', hint: 'Crea un nodo con un valor. Este será el centro de tu constelación.' },
      2: { instruction: 'Inserta una estrella más pequeña a la izquierda', hint: 'Si el nuevo valor es menor que la raíz, asígnalo a `root.left`.' },
      3: { instruction: 'Inserta una estrella más grande a la derecha', hint: 'Si el nuevo valor es mayor que la raíz, asígnalo a `root.right`.' }
    },
    fr: {
      1: { instruction: 'Créer l\'étoile primaire (Racine)', hint: 'Créez un nœud avec une valeur. Ce sera le centre de votre constellation.' },
      2: { instruction: 'Insérer une étoile plus petite à la gauche', hint: 'Si la nouvelle valeur est inférieure à la racine, attribuez-la à `root.left`.' },
      3: { instruction: 'Insérer une étoile plus grande à la droite', hint: 'Si la nouvelle valeur est supérieure à la racine, attribuez-la à `root.right`.' }
    }
  }
};

export const pythonIntroChallenge: Challenge = {
  id: 'python-basics-1',
  title: 'Python: Variables & Printing',
  description: 'Learn the basics of Python: defining variables and printing to the console.',
  difficulty: 'beginner',
  xpReward: 100,
  isLocked: false,
  isCompleted: false,
  category: 'Python',
  steps: [
    {
      id: 1,
      instruction: 'Create a variable named `greeting` and assign it the string "Hello CodeQuest"',
      hint: 'In Python, you define a variable just by naming it: `variable_name = "value"`',
      expectedCode: ['greeting =', '"Hello CodeQuest"', "'Hello CodeQuest'"],
      visualizationType: 'console',
    },
    {
      id: 2,
      instruction: 'Print the value of `greeting` to the console',
      hint: 'Use the `print()` function.',
      expectedCode: ['print(greeting)'],
      visualizationType: 'console',
    },
    {
      id: 3,
      instruction: 'Create a variable `age` with value 25 and print it',
      hint: '`age = 25` then `print(age)`',
      expectedCode: ['age = 25', 'print(age)'],
      visualizationType: 'console',
    }
  ],
};

export const jsFunctionChallenge: Challenge = {
  id: 'js-functions-1',
  title: 'JavaScript: Functions',
  description: 'Master the power of reusable code with functions in JavaScript.',
  difficulty: 'beginner',
  xpReward: 125,
  isLocked: false,
  isCompleted: false,
  category: 'JavaScript',
  steps: [
    {
      id: 1,
      instruction: 'Define a function named `sayHello` that prints "Hello!"',
      hint: 'Use `function sayHello() { ... }` or `const sayHello = () => { ... }`',
      expectedCode: ['function sayHello', 'console.log("Hello!")', "console.log('Hello!')"],
      visualizationType: 'console',
    },
    {
      id: 2,
      instruction: 'Call the `sayHello` function',
      hint: 'Just write the function name followed by parentheses: `sayHello()`',
      expectedCode: ['sayHello()'],
      visualizationType: 'console',
    }
  ],
};

// --- New Python Challenges ---

export const pythonLoopChallenge: Challenge = {
  id: 'python-loops',
  title: 'Python: Loops & Iteration',
  description: 'Learn how to repeat actions using for and while loops.',
  difficulty: 'beginner',
  xpReward: 100,
  isLocked: false,
  isCompleted: false,
  category: 'Python',
  steps: [
    {
      id: 1,
      instruction: 'Create a for loop that iterates from 0 to 4',
      hint: 'Use `range(5)` in your loop: `for i in range(5):`',
      expectedCode: ['for', 'in', 'range(5)'],
      visualizationType: 'console',
    },
    {
      id: 2,
      instruction: 'Print the loop variable `i`',
      hint: 'Inside the loop block, call `print(i)`',
      expectedCode: ['print(i)'],
      visualizationType: 'console',
    }
  ]
};

export const pythonListChallenge: Challenge = {
  id: 'python-lists',
  title: 'Python: Lists Mastery',
  description: 'Understand how to store and manipulate collections of data.',
  difficulty: 'intermediate',
  xpReward: 150,
  isLocked: false,
  isCompleted: false,
  category: 'Python',
  steps: [
    {
      id: 1,
      instruction: 'Create a list named `fruits` with "apple" and "banana"',
      hint: 'Lists use square brackets: `fruits = ["apple", "banana"]`',
      expectedCode: ['fruits =', '["apple", "banana"]', "['apple', 'banana']"],
      visualizationType: 'console',
    },
    {
      id: 2,
      instruction: 'Add "cherry" to the list',
      hint: 'Use the `.append()` method: `fruits.append("cherry")`',
      expectedCode: ['fruits.append', '"cherry"', "'cherry'"],
      visualizationType: 'console',
    }
  ]
};

// --- New Java Challenges ---

export const javaBasicChallenge: Challenge = {
  id: 'java-basics',
  title: 'Java: Hello World',
  description: 'Your first step into the world of Java programming.',
  difficulty: 'beginner',
  xpReward: 100,
  isLocked: false,
  isCompleted: false,
  category: 'Java',
  steps: [
    {
      id: 1,
      instruction: 'Define the main class named `Main`',
      hint: 'In Java, all code lives in a class: `public class Main { ... }`',
      expectedCode: ['class Main', 'public class'],
      visualizationType: 'console',
    },
    {
      id: 2,
      instruction: 'Create the main method',
      hint: 'The entry point is `public static void main(String[] args)`',
      expectedCode: ['public static void main', 'String[] args'],
      visualizationType: 'console',
    },
    {
      id: 3,
      instruction: 'Print "Hello Java" to the console',
      hint: 'Use `System.out.println("Hello Java");`',
      expectedCode: ['System.out.println', '"Hello Java"'],
      visualizationType: 'console',
    }
  ]
};

export const javaOOPChallenge: Challenge = {
  id: 'java-oop',
  title: 'Java: Classes & Objects',
  description: 'Understand the core of Object-Oriented Programming in Java.',
  difficulty: 'intermediate',
  xpReward: 200,
  isLocked: false,
  isCompleted: false,
  category: 'Java',
  steps: [
    {
      id: 1,
      instruction: 'Define a class named `Car`',
      hint: '`class Car { ... }`',
      expectedCode: ['class Car'],
      visualizationType: 'console',
    },
    {
      id: 2,
      instruction: 'Add a `speed` integer attribute',
      hint: 'Inside the class: `int speed;`',
      expectedCode: ['int speed', 'private int speed', 'public int speed'],
      visualizationType: 'console',
    }
  ]
};

// --- Helper Functions for Procedural Generation ---

const generateStepsForTopic = (category: string, topic: string, count: number): ChallengeStep[] => {
  return Array.from({ length: count }, (_, i) => {
    let instruction = '';
    let hint = '';
    let code = '';

    const stepNum = i + 1;

    switch (category) {
      case 'Python':
        instruction = `Step ${stepNum}: Implement logic for ${topic} - Part ${stepNum}`;
        hint = `Think about how ${topic} works in Python. Use standard syntax.`;
        code = `# Write your ${topic} code here\npass`;
        break;
      case 'Java':
        instruction = `Step ${stepNum}: Implement ${topic} functionality - Part ${stepNum}`;
        hint = `In Java, ensure you follow strict typing for ${topic}.`;
        code = `// Implement ${topic} step ${stepNum}\n`;
        break;
      case 'JavaScript':
        instruction = `Step ${stepNum}: Create ${topic} solution - Part ${stepNum}`;
        hint = `Use modern ES6+ features if applicable for ${topic}.`;
        code = `// ${topic} implementation step ${stepNum}\n`;
        break;
      case 'Data Structures':
        instruction = `Step ${stepNum}: Manipulate the ${topic} structure - Part ${stepNum}`;
        hint = `Consider the time complexity for this ${topic} operation.`;
        code = `// ${topic} logic step ${stepNum}\n`;
        break;
      case 'Algorithms':
        instruction = `Step ${stepNum}: Execute ${topic} algorithm step - Part ${stepNum}`;
        hint = `Follow the ${topic} algorithm flow carefully.`;
        code = `// ${topic} step ${stepNum}\n`;
        break;
      default:
        instruction = `Step ${stepNum}: Complete the task for ${topic}`;
        hint = `Review the documentation for ${category} relating to ${topic}.`;
        code = `// Code for ${topic}\n`;
    }

    return {
      id: stepNum,
      instruction,
      hint,
      expectedCode: [topic.toLowerCase().split(' ')[0]], // Basic validation check
      visualizationType: i % 2 === 0 ? 'console' : 'node-create', // Alternate visualizers
    };
  });
};

const generateCategoryChallenges = (category: string, topics: string[]): Challenge[] => {
  return topics.map((topic, index) => ({
    id: `${category.toLowerCase().replace(/\s+/g, '-')}-challenge-${index + 1}`,
    title: `${category} Challenge ${index + 1}: ${topic}`,
    description: `Master the concept of ${topic} in ${category}. This challenge consists of 10 in-depth steps.`,
    difficulty: index < 7 ? 'beginner' : index < 14 ? 'intermediate' : 'advanced',
    xpReward: index < 7 ? 100 : index < 14 ? 200 : 300,
    isLocked: false, // Unlock all except the first one to enforce sequence (configurable)
    isCompleted: false, // Reset completion for new structure
    category: category,
    steps: generateStepsForTopic(category, topic, 10), // Exactly 10 steps
  }));
};

// --- Topics Definition ---

const pythonTopics = [
  'Variables', 'Data Types', 'Operators', 'Control Flow', 'Loops', 'Functions', 'Lists',
  'Tuples', 'Dictionaries', 'Sets', 'File I/O', 'Exception Handling', 'Modules', 'Classes',
  'Inheritance', 'Polymorphism', 'Encapsulation', 'Decorators', 'Generators', 'Lambda'
];

const javaTopics = [
  'Syntax Basics', 'Variables', 'Data Types', 'Operators', 'If-Else', 'Switch', 'While Loop',
  'For Loop', 'Arrays', 'Methods', 'Classes', 'Objects', 'Constructors', 'Inheritance',
  'Polymorphism', 'Abstraction', 'Interfaces', 'Exceptions', 'Collections', 'Streams'
];

const jsTopics = [
  'Variables', 'Data Types', 'Operators', 'Functions', 'Arrow Functions', 'Objects', 'Arrays',
  'Array Methods', 'DOM Manipulation', 'Events', 'Promises', 'Async/Await', 'Fetch API', 'Local Storage',
  'ES6+ Features', 'Closures', 'Prototypes', 'Classes', 'Modules', 'Error Handling'
];

const dsaTopics = [
  'Arrays', 'Linked Lists', 'Stacks', 'Queues', 'Binary Trees', 'BST', 'Heaps', 'Hashing',
  'Graphs', 'DFS', 'BFS', 'Sorting', 'Searching', 'Recursion', 'Dynamic Programming',
  'Greedy Algorithms', 'Backtracking', 'Trie', 'Segment Trees', 'Disjoint Set'
];

const generateChallenges = (): Challenge[] => {
  const generated: Challenge[] = [];

  // 1. Python Challenges (20)
  generated.push(...generateCategoryChallenges('Python', pythonTopics));

  // 2. Java Challenges (20)
  generated.push(...generateCategoryChallenges('Java', javaTopics));

  // 3. DSA Challenges (20) (User requested "Data Structures" and "Algorithms" separately often, but "DSA" is the category here)
  // We will map these to "Data Structures" category as per previous request or "DSA" if user wants that specific name.
  // The user said "DSA" in the list. Let's use "Data Structures" as the internal category name to match the UI sort order "Data Structures".
  generated.push(...generateCategoryChallenges('Data Structures', dsaTopics));

  // 4. Algorithm Challenges (Example topics)
  const algoTopics = ['Bubble Sort', 'Merge Sort', 'Quick Sort', 'Binary Search', 'Dijkstra', 'A*', 'Knapsack', 'LCS', 'Floyd Warshall', 'Kruskal'];
  generated.push(...generateCategoryChallenges('Algorithms', algoTopics));

  // 5. Frontend & Others (Preserve spacing for them)
  const feTopics = ['HTML Basics', 'CSS Selectors', 'Flexbox', 'Grid', 'Responsive Design', 'DOM', 'Events', 'Forms', 'Accessibility', 'SEO'];
  generated.push(...generateCategoryChallenges('Frontend', feTopics));

  // 6. JavaScript Challenges (20)
  generated.push(...generateCategoryChallenges('JavaScript', jsTopics));

  // 7. Backend
  const beTopics = ['Node.js Setup', 'Express Basics', 'REST API', 'Routing', 'Middleware', 'Controllers', 'Authentication', 'Database Conn', 'Error Handling', 'Deployment'];
  generated.push(...generateCategoryChallenges('Backend', beTopics));

  // 8. Database
  const dbTopics = ['SQL Basics', 'SELECT', 'WHERE', 'JOINS', 'Indexes', 'Normalization', 'Transactions', 'NoSQL', 'MongoDB', 'Aggregation'];
  generated.push(...generateCategoryChallenges('Database', dbTopics));

  // 9. DevOps
  const devopsTopics = ['Git Basics', 'Docker', 'CI/CD', 'Kubernetes', 'AWS', 'Linux Basics', 'Bash Scripting', 'Monitoring', 'Logging', 'Security'];
  generated.push(...generateCategoryChallenges('DevOps', devopsTopics));

  return generated;
};

export const mockChallenges: Challenge[] = generateChallenges();

export const codeTemplates: Record<string, string> = {
  python: `# Python - Linked List Node
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

# Create your first node here
`,
  javascript: `// JavaScript - Linked List Node
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

// Create your first node here
`,
  java: `// Java - Linked List Node
class Node {
    int data;
    Node next;
    
    Node(int data) {
        this.data = data;
        this.next = null;
    }
}

// Create your first node here
`,
  cpp: `// C++ - Linked List Node
struct Node {
    int data;
    Node* next;
    
    Node(int val) : data(val), next(nullptr) {}
};

// Create your first node here
`,
  c: `// C - Linked List Node
#include <stdlib.h>

struct Node {
    int data;
    struct Node* next;
};

// Create your first node here
`,
};

// API placeholder functions
export const api = {
  login: async (email: string, password: string): Promise<{ success: boolean; user?: any }> => {
    // Placeholder - would connect to backend
    console.log('API: Login attempt', { email });
    return { success: true, user: mockUser };
  },

  signup: async (email: string, password: string, username: string): Promise<{ success: boolean }> => {
    console.log('API: Signup attempt', { email, username });
    return { success: true };
  },

  getChallenges: async (): Promise<Challenge[]> => {
    return mockChallenges;
  },

  getChallenge: async (id: string): Promise<Challenge | undefined> => {
    return mockChallenges.find(c => c.id === id);
  },

  getUserProgress: async (): Promise<UserProgress> => {
    return mockUser;
  },

  submitCode: async (challengeId: string, code: string, language: string): Promise<{ success: boolean; message: string }> => {
    console.log('API: Code submitted', { challengeId, language });
    // Mock validation
    return { success: true, message: 'Code executed successfully!' };
  },

  completeStep: async (challengeId: string, stepId: number): Promise<{ success: boolean; xpEarned: number }> => {
    return { success: true, xpEarned: 25 };
  },
};

export interface LinkedInProfile {
  id: string;
  name: string;
  role: string;
  company: string;
  imageUrl: string;
  profileUrl: string;
  skills: string[];
  techStack: string; // The primary language they are recommended for
}

export const mockLinkedInProfiles: LinkedInProfile[] = [
  // JavaScript / TypeScript
  { id: 'li-1', name: 'Sarah Chen', role: 'Senior Frontend Engineer', company: 'Google', imageUrl: 'https://i.pravatar.cc/150?u=sarah', profileUrl: 'https://www.linkedin.com/in/sarah-chen', skills: ['React', 'TypeScript', 'Node.js'], techStack: 'javascript' },
  { id: 'li-2', name: 'Marcus Johnson', role: 'Full Stack Developer', company: 'Netflix', imageUrl: 'https://i.pravatar.cc/150?u=marcus', profileUrl: 'https://www.linkedin.com/in/marcus-johnson', skills: ['JavaScript', 'Vue', 'AWS'], techStack: 'javascript' },
  { id: 'li-3', name: 'Elena Rodriguez', role: 'Staff Software Engineer', company: 'Vercel', imageUrl: 'https://i.pravatar.cc/150?u=elena', profileUrl: 'https://www.linkedin.com/in/elena-rodriguez', skills: ['Next.js', 'React', 'TypeScript'], techStack: 'typescript' },
  { id: 'li-4', name: 'David Kim', role: 'Web Platform Engineer', company: 'Stripe', imageUrl: 'https://i.pravatar.cc/150?u=david', profileUrl: 'https://www.linkedin.com/in/david-kim', skills: ['TypeScript', 'GraphQL', 'React'], techStack: 'typescript' },
  { id: 'li-15', name: 'Alicia Keys', role: 'UI/UX Developer', company: 'Airbnb', imageUrl: 'https://i.pravatar.cc/150?u=alicia', profileUrl: 'https://www.linkedin.com/in/alicia-frontend', skills: ['JavaScript', 'CSS', 'Framer'], techStack: 'javascript' },
  { id: 'li-16', name: 'Tom Hanks', role: 'Core Contributor', company: 'React Foundation', imageUrl: 'https://i.pravatar.cc/150?u=tomh', profileUrl: 'https://www.linkedin.com/in/tom-hanks-dev', skills: ['React', 'JavaScript', 'Architecture'], techStack: 'javascript' },
  { id: 'li-17', name: 'Nina Simone', role: 'Senior Ts Developer', company: 'Microsoft', imageUrl: 'https://i.pravatar.cc/150?u=nina', profileUrl: 'https://www.linkedin.com/in/nina-typescript', skills: ['TypeScript', 'Azure', 'Node.js'], techStack: 'typescript' },
  { id: 'li-18', name: 'John Doe', role: 'JS Backend Engineer', company: 'Discord', imageUrl: 'https://i.pravatar.cc/150?u=johnd', profileUrl: 'https://www.linkedin.com/in/johndoe-backend', skills: ['Node.js', 'Express', 'WebSockets'], techStack: 'javascript' },
  { id: 'li-19', name: 'Emma Watson', role: 'Frontend Architect', company: 'Figma', imageUrl: 'https://i.pravatar.cc/150?u=emma', profileUrl: 'https://www.linkedin.com/in/emma-watson-ui', skills: ['JavaScript', 'Canvas', 'WebGL'], techStack: 'javascript' },
  { id: 'li-20', name: 'Chris Evans', role: 'Full Stack Web Dev', company: 'Slack', imageUrl: 'https://i.pravatar.cc/150?u=chrise', profileUrl: 'https://www.linkedin.com/in/chrisevans-dev', skills: ['JavaScript', 'Electron', 'React'], techStack: 'javascript' },

  // Python
  { id: 'li-5', name: 'Priya Sharma', role: 'Machine Learning Engineer', company: 'OpenAI', imageUrl: 'https://i.pravatar.cc/150?u=priya', profileUrl: 'https://www.linkedin.com/in/priya-sharma-ml', skills: ['Python', 'PyTorch', 'TensorFlow'], techStack: 'python' },
  { id: 'li-6', name: 'Alex Wong', role: 'Backend Data Engineer', company: 'Spotify', imageUrl: 'https://i.pravatar.cc/150?u=alex', profileUrl: 'https://www.linkedin.com/in/alex-wong-data', skills: ['Python', 'Django', 'PostgreSQL'], techStack: 'python' },
  { id: 'li-21', name: 'Will Smith', role: 'AI Researcher', company: 'DeepMind', imageUrl: 'https://i.pravatar.cc/150?u=will', profileUrl: 'https://www.linkedin.com/in/will-smith-ai', skills: ['Python', 'JAX', 'Transformers'], techStack: 'python' },
  { id: 'li-22', name: 'Scarlett Johansson', role: 'Data Scientist', company: 'Meta', imageUrl: 'https://i.pravatar.cc/150?u=scarlett', profileUrl: 'https://www.linkedin.com/in/scarlett-data', skills: ['Python', 'Pandas', 'Scikit-Learn'], techStack: 'python' },
  { id: 'li-23', name: 'Robert Downey', role: 'Backend Python Dev', company: 'Instagram', imageUrl: 'https://i.pravatar.cc/150?u=robert', profileUrl: 'https://www.linkedin.com/in/robert-dj', skills: ['Python', 'FastAPI', 'Redis'], techStack: 'python' },
  { id: 'li-24', name: 'Natalie Portman', role: 'Quant Researcher', company: 'Jane Street', imageUrl: 'https://i.pravatar.cc/150?u=natalie', profileUrl: 'https://www.linkedin.com/in/natalie-quant', skills: ['Python', 'Numpy', 'Finance'], techStack: 'python' },
  { id: 'li-25', name: 'Christian Bale', role: 'Vision Engineer', company: 'Tesla', imageUrl: 'https://i.pravatar.cc/150?u=christian', profileUrl: 'https://www.linkedin.com/in/christian-cv', skills: ['Python', 'OpenCV', 'C++'], techStack: 'python' },
  { id: 'li-26', name: 'Anne Hathaway', role: 'NLP Engineer', company: 'HuggingFace', imageUrl: 'https://i.pravatar.cc/150?u=anne', profileUrl: 'https://www.linkedin.com/in/anne-nlp', skills: ['Python', 'PyTorch', 'LLMs'], techStack: 'python' },
  { id: 'li-27', name: 'Hugh Jackman', role: 'Automation Staff Eng', company: 'Netflix', imageUrl: 'https://i.pravatar.cc/150?u=hugh', profileUrl: 'https://www.linkedin.com/in/hugh-auto', skills: ['Python', 'Selenium', 'CI/CD'], techStack: 'python' },
  { id: 'li-28', name: 'Zendaya Coleman', role: 'Cloud Python Dev', company: 'AWS', imageUrl: 'https://i.pravatar.cc/150?u=zendaya', profileUrl: 'https://www.linkedin.com/in/zendaya-cloud', skills: ['Python', 'Boto3', 'Serverless'], techStack: 'python' },

  // Java & C++
  { id: 'li-7', name: 'James Smith', role: 'Distributed Systems', company: 'Amazon', imageUrl: 'https://i.pravatar.cc/150?u=james', profileUrl: 'https://www.linkedin.com/in/james-smith-java', skills: ['Java', 'Spring Boot', 'Kafka'], techStack: 'java' },
  { id: 'li-8', name: 'Anita Patel', role: 'Core Systems Developer', company: 'Microsoft', imageUrl: 'https://i.pravatar.cc/150?u=anita', profileUrl: 'https://www.linkedin.com/in/anita-patel-cpp', skills: ['C++', 'Systems Design', 'Algorithms'], techStack: 'cpp' },
  { id: 'li-29', name: 'Keanu Reeves', role: 'Java Enterprise Dev', company: 'Oracle', imageUrl: 'https://i.pravatar.cc/150?u=keanu', profileUrl: 'https://www.linkedin.com/in/keanu-java', skills: ['Java', 'Jakarta', 'Oracle DB'], techStack: 'java' },
  { id: 'li-30', name: 'Sandra Bullock', role: 'Android Audio Dev', company: 'Spotify', imageUrl: 'https://i.pravatar.cc/150?u=sandra', profileUrl: 'https://www.linkedin.com/in/sandra-cpp', skills: ['C++', 'Audio', 'JNI'], techStack: 'cpp' },
  { id: 'li-31', name: 'Morgan Freeman', role: 'Trading Systems', company: 'Citadel', imageUrl: 'https://i.pravatar.cc/150?u=morgan', profileUrl: 'https://www.linkedin.com/in/morgan-trading', skills: ['C++', 'Low Latency', 'Finance'], techStack: 'cpp' },
  { id: 'li-32', name: 'Meryl Streep', role: 'Game Engine Dev', company: 'Epic Games', imageUrl: 'https://i.pravatar.cc/150?u=meryl', profileUrl: 'https://www.linkedin.com/in/meryl-unreal', skills: ['C++', 'Unreal', 'Graphics'], techStack: 'cpp' },
  { id: 'li-33', name: 'Leo DiCaprio', role: 'Senior Java Dev', company: 'Block', imageUrl: 'https://i.pravatar.cc/150?u=leo', profileUrl: 'https://www.linkedin.com/in/leo-payments', skills: ['Java', 'Spring', 'Microservices'], techStack: 'java' },
  { id: 'li-34', name: 'Kate Winslet', role: 'Android Platform', company: 'Google', imageUrl: 'https://i.pravatar.cc/150?u=kate', profileUrl: 'https://www.linkedin.com/in/kate-android', skills: ['Java', 'Kotlin', 'AOSP'], techStack: 'java' },
  { id: 'li-35', name: 'Tom Cruise', role: 'Firmware Engineer', company: 'Sony', imageUrl: 'https://i.pravatar.cc/150?u=tomc', profileUrl: 'https://www.linkedin.com/in/tomc-firmware', skills: ['C++', 'C', 'RTOS'], techStack: 'cpp' },
  { id: 'li-36', name: 'Julia Roberts', role: 'JVM Architect', company: 'Red Hat', imageUrl: 'https://i.pravatar.cc/150?u=julia', profileUrl: 'https://www.linkedin.com/in/julia-jvm', skills: ['Java', 'JVM Internals', 'GC'], techStack: 'java' },

  // C / Rust / Go / Ruby / PHP
  { id: 'li-9', name: 'Michael Chang', role: 'Embedded Systems', company: 'Tesla', imageUrl: 'https://i.pravatar.cc/150?u=michael', profileUrl: 'https://www.linkedin.com/in/michael-chang-sys', skills: ['C', 'RTOS', 'Hardware'], techStack: 'c' },
  { id: 'li-10', name: 'Sophie Martin', role: 'Platform Engineer', company: 'Cloudflare', imageUrl: 'https://i.pravatar.cc/150?u=sophie', profileUrl: 'https://www.linkedin.com/in/sophie-martin-rust', skills: ['Rust', 'WebAssembly', 'Networking'], techStack: 'rust' },
  { id: 'li-11', name: 'Omar Al-Fayed', role: 'Infrastructure', company: 'Uber', imageUrl: 'https://i.pravatar.cc/150?u=omar', profileUrl: 'https://www.linkedin.com/in/omar-go', skills: ['Go', 'Kubernetes', 'Microservices'], techStack: 'go' },
  { id: 'li-12', name: 'Jessica Taylor', role: 'Senior Ruby Dev', company: 'Shopify', imageUrl: 'https://i.pravatar.cc/150?u=jessica', profileUrl: 'https://www.linkedin.com/in/jessica-ruby', skills: ['Ruby on Rails', 'PostgreSQL', 'Redis'], techStack: 'ruby' },
  { id: 'li-13', name: 'Luca Romano', role: 'Lead PHP Developer', company: 'Automattic', imageUrl: 'https://i.pravatar.cc/150?u=luca', profileUrl: 'https://www.linkedin.com/in/luca-php', skills: ['PHP', 'Laravel', 'MySQL'], techStack: 'php' },
];
