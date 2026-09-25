import { randomUUID } from 'crypto';

interface BenchmarkResult {
  method: string;
  size: number;
  iterations: number;
  totalTimeMs: number;
  avgTimeNs: number;
  memoryBefore: number;
  memoryAfter: number;
  memoryDeltaMB: number;
}

// Method 1: Check Object.keys length
function checkEmpty_ObjectKeys(obj: Record<string, unknown>): boolean {
  return Object.keys(obj).length === 0;
}

// Method 2: For...in loop with break
function checkEmpty_ForLoop(obj: Record<string, unknown>): boolean {
  let empty = true;
  for (const k in obj) {
    // if (Object.prototype.hasOwnProperty.call(obj, k)) {
      empty = false;
      break;
    // }
  }
  return empty;
}

// Generate test object with n UUID keys
function generateTestObject(size: number): Record<string, unknown> {
  const obj: Record<string, unknown> = {};
  for (let i = 0; i < size; i++) {
    obj[randomUUID()] = i;
  }
  return obj;
}

// Map-based methods
function checkEmpty_MapSize(map: Map<string, unknown>): boolean {
  return map.size === 0;
}

function checkEmpty_MapIterate(map: Map<string, unknown>): boolean {
  for (const _ of map) {
    return false;
  }
  return true;
}

// Generate test Map with n UUID keys
function generateTestMap(size: number): Map<string, unknown> {
  const map = new Map<string, unknown>();
  for (let i = 0; i < size; i++) {
    map.set(randomUUID(), i);
  }
  return map;
}

// Run benchmark for a single method (generic version)
function benchmark<T extends Record<string, unknown> | Map<string, unknown>>(
  methodName: string,
  method: (obj: T) => boolean,
  testObject: T,
  iterations: number = 1_000_000
): BenchmarkResult {
  const size = testObject instanceof Map ? testObject.size : Object.keys(testObject).length;
  
  // Warm up
  for (let i = 0; i < 1000; i++) {
    method(testObject);
  }

  // Force garbage collection if available
  if (global.gc) {
    global.gc();
  }

  const memoryBefore = process.memoryUsage().heapUsed;
  const startTime = process.hrtime.bigint();

  for (let i = 0; i < iterations; i++) {
    method(testObject);
  }

  const endTime = process.hrtime.bigint();
  const totalTimeNs = Number(endTime - startTime);
  const totalTimeMs = totalTimeNs / 1_000_000;
  const avgTimeNs = totalTimeNs / iterations;

  if (global.gc) {
    global.gc();
  }
  const memoryAfter = process.memoryUsage().heapUsed;
  const memoryDeltaMB = (memoryAfter - memoryBefore) / 1024 / 1024;

  return {
    method: methodName,
    size,
    iterations,
    totalTimeMs,
    avgTimeNs,
    memoryBefore,
    memoryAfter,
    memoryDeltaMB,
  };
}

// Determine iterations based on object size
function getIterations(size: number): number {
  return 50_000;
}

// Main benchmark suite
async function runBenchmarks() {
  const sizes = [0, 2 ** 4, 2 ** 8, 2 ** 12];
  const objectMethods = [
    { name: 'Object.keys().length', fn: checkEmpty_ObjectKeys },
    { name: 'For...in Loop', fn: checkEmpty_ForLoop },
  ];
  const mapMethods = [
    { name: 'Map.size', fn: checkEmpty_MapSize },
    { name: 'For...of Loop', fn: checkEmpty_MapIterate },
  ];

  const results: BenchmarkResult[] = [];

  console.log('🏁 Starting benchmark suite...\n');
  console.log(`📊 Test parameters:`);
  console.log(`   - Sizes: ${sizes.map(s => s === 0 ? '0' : `2^${Math.log2(s)}`).join(', ')} entries`);
  console.log(`   - Adaptive iterations: 50K per test`);
  console.log(`   - Testing: Objects and Maps\n`);

  let testNumber = 1;
  const totalTests = (sizes.length * objectMethods.length) + (sizes.length * mapMethods.length);

  // ===== Test Objects =====
  console.log('📊 TESTING OBJECTS\n');
  for (const size of sizes) {
    console.log(`📦 Creating object with ${size.toLocaleString()} entries...`);
    const testObject = generateTestObject(size);
    console.log(`✓ Object created\n`);

    for (const method of objectMethods) {
      const progress = `[${testNumber}/${totalTests}]`;
      const iterations = getIterations(size);
      console.log(`${progress} Testing "${method.name}" on ${size.toLocaleString()} entries (${iterations.toLocaleString()} iterations)...`);

      const result = benchmark(method.name, method.fn, testObject, iterations);
      results.push(result);

      console.log(`   ✓ Total time: ${result.totalTimeMs.toFixed(2)}ms`);
      console.log(`   ✓ Avg time per call: ${result.avgTimeNs.toFixed(2)}ns`);
      console.log(`   ✓ Memory delta: ${result.memoryDeltaMB.toFixed(4)}MB\n`);

      testNumber++;
    }
  }

  // ===== Test Maps =====
  console.log('\n📊 TESTING MAPS\n');
  for (const size of sizes) {
    console.log(`📦 Creating Map with ${size.toLocaleString()} entries...`);
    const testMap = generateTestMap(size);
    console.log(`✓ Map created\n`);

    for (const method of mapMethods) {
      const progress = `[${testNumber}/${totalTests}]`;
      const iterations = getIterations(size);
      console.log(`${progress} Testing "${method.name}" on ${size.toLocaleString()} entries (${iterations.toLocaleString()} iterations)...`);

      const result = benchmark(method.name, method.fn, testMap, iterations);
      results.push(result);

      console.log(`   ✓ Total time: ${result.totalTimeMs.toFixed(2)}ms`);
      console.log(`   ✓ Avg time per call: ${result.avgTimeNs.toFixed(2)}ns`);
      console.log(`   ✓ Memory delta: ${result.memoryDeltaMB.toFixed(4)}MB\n`);

      testNumber++;
    }
  }

  // Print final results table
  console.log('\n' + '='.repeat(140));
  console.log('📈 FINAL RESULTS');
  console.log('='.repeat(140) + '\n');

  // Group by type and size
  console.log('🔷 OBJECT METHODS\n');
  for (const size of sizes) {
    const sizeResults = results.filter(r => r.size === size && (r.method === 'Object.keys().length' || r.method === 'For...in Loop'));
    
    console.log(`📌 Size: ${size.toLocaleString()} entries${size === 0 ? ' (empty)' : ''}`);
    console.log('-'.repeat(140));
    console.log(
      `${'Method'.padEnd(25)} | ${'Avg Time (ns)'.padStart(15)} | ${'Avg Time (μs)'.padStart(15)} | ${'Memory Δ (MB)'.padStart(15)}`
    );
    console.log('-'.repeat(140));

    for (const result of sizeResults) {
      const avgTimeUs = result.avgTimeNs / 1000;
      console.log(
        `${result.method.padEnd(25)} | ${result.avgTimeNs.toFixed(2).padStart(15)} | ${avgTimeUs.toFixed(4).padStart(15)} | ${result.memoryDeltaMB.toFixed(6).padStart(15)}`
      );
    }
    console.log();
  }

  console.log('\n🔶 MAP METHODS\n');
  for (const size of sizes) {
    const sizeResults = results.filter(r => r.size === size && (r.method === 'Map.size' || r.method === 'For...of Loop'));
    
    console.log(`📌 Size: ${size.toLocaleString()} entries${size === 0 ? ' (empty)' : ''}`);
    console.log('-'.repeat(140));
    console.log(
      `${'Method'.padEnd(25)} | ${'Avg Time (ns)'.padStart(15)} | ${'Avg Time (μs)'.padStart(15)} | ${'Memory Δ (MB)'.padStart(15)}`
    );
    console.log('-'.repeat(140));

    for (const result of sizeResults) {
      const avgTimeUs = result.avgTimeNs / 1000;
      console.log(
        `${result.method.padEnd(25)} | ${result.avgTimeNs.toFixed(2).padStart(15)} | ${avgTimeUs.toFixed(4).padStart(15)} | ${result.memoryDeltaMB.toFixed(6).padStart(15)}`
      );
    }
    console.log();
  }

  console.log('\n' + '='.repeat(140));
  console.log('✅ Benchmark complete!\n');
}

// Run with --expose-gc flag for better memory measurements
runBenchmarks().catch(console.error);
