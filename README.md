# DeepScan - Advanced DSA Plagiarism Detection System 🛡️

**DeepScan** is a high-performance, enterprise-grade plagiarism detection system designed for academic and resume portfolios. Unlike standard plagiarism checkers that rely on basic string checks or simulated random outputs, DeepScan implements a series of **custom-built, advanced Data Structures and Algorithms (DSA)** and **Natural Language Processing (NLP)** pipelines directly in the client application.

This application runs **100% client-side** in the browser. It features a stunning responsive dark glassmorphism Dashboard UI, an interactive side-by-side highlighted comparison pane, an automated DSA Validation Test suite, and a live CRT-style developer execution console.

---

## 📁 Modular Folder Structure

DeepScan has been modularized according to professional clean architecture conventions:

```
PlagiarismChecker-main/
│
├── index.html                   # Beautiful Glassmorphism Dashboard UI
├── styles.css                   # Premium styling (neon dark theme, visual console)
├── README.md                    # Professional project documentation (this file)
│
└── js/                          # Modular JavaScript Core
    ├── dsa/
    │   ├── trie.js              # Custom Trie for corpus vocabulary indexing
    │   ├── kmp.js               # Knuth-Morris-Pratt substring search algorithm
    │   ├── boyer_moore.js       # Boyer-Moore bad-character heuristic string search
    │   ├── rabin_karp.js        # Rabin-Karp polynomial rolling hash substring search
    │   └── suffix_array.js      # Suffix Array construction & binary search bounds retrieval
    │
    ├── utils/
    │   └── nlp.js               # Normalization, tokenization, stop-words & Porter Stemmer
    │
    ├── core/
    │   ├── hash_table.js        # Custom HashTable with dynamic resizing & linked chaining
    │   ├── indexer.js           # Inverted Index corpus manager using custom HashTable
    │   └── similarity.js        # Cosine TF-IDF, Jaccard Index & Trigram calculators
    │
    └── app.js                   # Main application coordinator, UI bindings & unit test runner
```

---

## 🛠️ Advanced DSA Concepts Explained

This project is built from scratch without relying on external libraries for algorithm logic. Below are explanations of the advanced concepts implemented:

### 1. Custom Hash Table (`js/core/hash_table.js`)
*   **Concept**: Standard Javascript Objects or Maps hide collision mechanisms. We implement an explicit `HashTable` class utilizing a **Polynomial Rolling Hash function** and **Collision Resolution by Chaining** (linked list nodes).
*   **Dynamic Resizing**: When the load factor ($\lambda = \text{size} / \text{capacity}$) exceeds a threshold of `0.75`, the Hash Table doubles its capacity, recalculates its hash multipliers, and rehashes all elements to maintain an average constant lookup time.
*   **Formula (Polynomial Rolling Hash)**:
    $$Hash(S) = \left( \sum_{i=0}^{L-1} S[i] \cdot p^i \right) \pmod m$$
    where $p = 31$ (prime multiplier) and $m$ is the table capacity.

### 2. Trie (Prefix Tree) (`js/dsa/trie.js`)
*   **Concept**: A retrieval tree used to index the vocabulary of the entire document corpus. Each character represents a node. It allows checking if a query word exists within the corpus dictionary in time proportional to the word's length, completely independent of the size of the corpus.
*   **DFS Prefix Autocomplete**: Implements a Depth-First Search (DFS) traversal to find and list all vocabulary terms matching a specific typed prefix.

### 3. Suffix Array (`js/dsa/suffix_array.js`)
*   **Concept**: A sorted array containing the starting indices of all suffixes of a text. This structure enables search queries of pattern size $M$ over text length $N$ in $O(M \log N)$ time via **Binary Search**, which is extremely optimal for scanning large libraries.
*   **Suffix Construction**: Generates indices for all suffixes of the text and sorts them lexicographically. Binary search bounds retrieval finds the first and last matches to return all occurrences of a plagiarized passage.

### 4. Knuth-Morris-Pratt (KMP) Algorithm (`js/dsa/kmp.js`)
*   **Concept**: A linear-time exact string-matching algorithm that scans from left to right. It avoids backtracking over previously compared characters by building a **Longest Proper Prefix which is also a Suffix (LPS)** array.
*   **LPS Table**: Tells the scanner exactly how many characters of the pattern can be bypassed upon a mismatch.

### 5. Boyer-Moore Algorithm (`js/dsa/boyer_moore.js`)
*   **Concept**: A highly efficient exact string-matching algorithm that scans from right to left. By utilizing the **Bad-Character Heuristic**, it aligns mismatched characters to their rightmost occurrence in the pattern, skipping large blocks of text and achieving sub-linear runtime averages.

### 6. Rabin-Karp Algorithm (`js/dsa/rabin_karp.js`)
*   **Concept**: A pattern-matching algorithm utilizing a **sliding polynomial rolling hash**. The hash of the text window is updated in $O(1)$ constant time as it slides. If the window's hash matches the pattern's hash, character validation verifies the match to rule out hash collisions.
*   **Rolling Hash Shift**:
    $$Hash_{new} = \left( d \cdot (Hash_{old} - S[i] \cdot d^{M-1}) + S[i+M] \right) \pmod q$$

### 7. Natural Language Processing (NLP) Pipeline (`js/utils/nlp.js`)
To match academic standards, documents are put through a rigorous preprocessing pipeline before checking similarity:
1.  **Normalization & Lowercasing**: Stripping capitalization and non-alphanumeric punctuation.
2.  **Sentence Tokenization**: Splitting document corpus by terminal punctuation boundaries (`.`, `!`, `?`) to index clause spans.
3.  **Word Tokenization**: Separating texts into an array of isolated lowercase words.
4.  **Stop Word Removal**: Removing common grammatical articles (e.g. `the`, `and`, `is`, `on`) which bias TF-IDF profiles.
5.  **Porter Stemming Algorithm**: A complete, step-by-step JavaScript implementation of Martin Porter's famous 1980 stemmer. It reduces inflectional word forms to their morphological root stem (e.g. `engineering`, `engineers`, `engineered` $\rightarrow$ `engin`).

---

## 📊 Time & Space Complexity Matrix

| Algorithm / Data Structure | Phase / Operation | Time Complexity (Best / Avg) | Time Complexity (Worst) | Space Complexity |
| :--- | :--- | :--- | :--- | :--- |
| **Custom Hash Table** | Search / Insert / Delete | $O(1)$ | $O(N)$ (during resizing) | $O(K + C)$ |
| **Trie (Prefix Tree)** | Insert / Word Lookup | $O(W)$ | $O(W)$ | $O(\Sigma \cdot N \cdot W)$ |
| **Suffix Array** | Construction / Binary Search | $O(N^2 \log N)$ / $O(M \log N)$ | $O(N^2 \log N)$ / $O(M \log N)$ | $O(N)$ |
| **Boyer-Moore** | Skips Substring Scan | $O(N / M)$ | $O(N \cdot M)$ | $O(\Sigma)$ |
| **Knuth-Morris-Pratt** | LPS Table / Substring Scan | $O(M)$ / $O(N + M)$ | $O(N + M)$ | $O(M)$ |
| **Rabin-Karp** | Sliding Window Scan | $O(N + M)$ | $O(N \cdot M)$ | $O(1)$ |
| **Cosine Similarity** | TF-IDF Vector Space Dot | $O(U)$ | $O(U)$ | $O(U)$ |

*Where:*
*   $N$: Length of the host text (document).
*   $M$: Length of the search pattern (query sentence).
*   $W$: Length of the word.
*   $K$: Number of unique keys; $C$: Capacity bucket size.
*   $\Sigma$: Unique character alphabet size.
*   $U$: Number of unique joint vocabulary terms.

---

## 📈 Similarity Metrics & Weighting Ratios

DeepScan combines multiple dimensions of mathematical similarity to prevent bypasses like paraphrasing or synonym replacement:
1.  **Cosine Similarity (TF-IDF)** (Weight: **50%**): Measures vector direction cosine distance of document term frequencies, weighted by overall Inverse Document Frequency (IDF) derived from the indexed corpus library. Prevents plagiarism bypasses via synonym swaps.
2.  **Trigram Similarity (N-gram)** (Weight: **30%**): Generates sliding windows of three word sequences (trigrams) and performs a set intersection overlap check. Detects word shifts and minor restructuring.
3.  **Jaccard Similarity** (Weight: **20%**): Set intersection over Union calculation of preprocessed words. Measures simple vocabulary overlap.

---

## 🌟 Premium Features

*   **Circular Progress Gauge**: Visually loaded radial SVG ring tracking the exact Plagiarism/Uniqueness percentage.
*   **Live Substring Benchmarking**: Click any highlighted plagiarized passage in the comparison viewer to witness the actual CPU execution runtimes of Suffix Array, Boyer-Moore, KMP, and Rabin-Karp searching for that exact passage!
*   **Live CRT Console**: Watch the system compile, tokenize, stem, and log load factors and index structures in a retro green CRT console block.
*   **Unit Verification Suite**: Developer trigger buttons that run automated assertions on HashTable resizing, Trie autocompletes, Porter Stemmer inflections, and substring match coordinates.
*   **Local Storage Session History**: Re-loads historical query results instantly from cache.

---

## 🚀 How to Run Locally

DeepScan runs entirely in standard modern web browsers and bypasses local CORS constraints by using global namespace scripts instead of restrictive strict module loaders.

1.  Download or clone the project folder.
2.  Double-click `index.html` to launch it directly in Chrome, Edge, Firefox, or Safari (works under `file:///` protocol natively!).
3.  *Alternative*: Open using **VS Code Live Server** or any static local hosting provider of choice.

---

## 🎓 Tips for College Viva & Presentations

If you are presenting this project for B.Tech, BCA, or CS evaluations, be prepared to answer these common questions:

1.  **"Why build a custom HashTable instead of standard JavaScript objects?"**
    *   *Answer*: Standard Javascript objects/maps encapsulate their hashing function and hide collision resolution. Building an explicit `HashTable` class with linked nodes (chaining) and dynamic load-factor resizing ($\lambda > 0.75$) demonstrates a deep core understanding of hash tables, memory structures, and collision boundaries.
2.  **"How does the Suffix Array binary search work?"**
    *   *Answer*: Since suffixes in the Suffix Array are alphabetically sorted, we can search for a pattern using Binary Search in $O(M \log N)$ time. By comparing the pattern with the suffix prefix at the middle index, we can search left to find the first occurrence (lower bound) and search right to find the last occurrence (upper bound).
3.  **"What is the difference between Boyer-Moore and KMP?"**
    *   *Answer*: KMP precomputes an LPS array scanning from left to right, assuring a linear $O(N + M)$ bounds guarantee. Boyer-Moore scans from right to left and shifts using the bad-character skip rule, allowing it to bypass up to $M$ characters at a time. Boyer-Moore operates in sub-linear $O(N/M)$ average time, making it significantly faster for long patterns.
4.  **"Explain the Porter Stemmer Step 1a."**
    *   *Answer*: Step 1a handles basic plural forms: it replaces suffix `sses` with `ss`, `ies` with `i`, leaves `ss` untouched, and removes singular trailing `s`. This normalizes inflections before they enter vector calculations.

---

### 👨‍💻 Developed By
**Delta Coders**  
*   **Nikhil Bloria** - Project Lead  
*   **Sarthak Chaubey** - B.Tech CSE (Cybersecurity)
