#!/usr/bin/env bun

import { writeFileSync } from "fs";
import { join } from "path";

const publicDir = join(import.meta.dir, "../public/products");

// Define SVG templates for each product
const productSVGs = {
  "oak-bench": {
    name: "Modern Oak Bench",
    svg: `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
  <rect width="800" height="600" fill="#fafaf9"/>
  
  <!-- Bench seat -->
  <rect x="150" y="280" width="500" height="40" rx="5" fill="#8b6f47" stroke="#6b563a" stroke-width="2"/>
  
  <!-- Wood grain lines -->
  <line x1="170" y1="290" x2="630" y2="290" stroke="#6b563a" stroke-width="1" opacity="0.3"/>
  <line x1="170" y1="300" x2="630" y2="300" stroke="#6b563a" stroke-width="1" opacity="0.3"/>
  <line x1="170" y1="310" x2="630" y2="310" stroke="#6b563a" stroke-width="1" opacity="0.3"/>
  
  <!-- Legs -->
  <rect x="180" y="320" width="30" height="100" fill="#8b6f47" stroke="#6b563a" stroke-width="2"/>
  <rect x="590" y="320" width="30" height="100" fill="#8b6f47" stroke="#6b563a" stroke-width="2"/>
  
  <!-- Product name -->
  <text x="400" y="480" font-family="system-ui, sans-serif" font-size="20" fill="#334155" text-anchor="middle">Modern Oak Bench</text>
</svg>`
  },
  
  "planter-set": {
    name: "Ceramic Planter Set",
    svg: `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
  <rect width="800" height="600" fill="#fafaf9"/>
  
  <!-- Large planter -->
  <path d="M 250 300 L 270 400 L 330 400 L 350 300 Z" fill="#e7e5e4" stroke="#a8a29e" stroke-width="2"/>
  <ellipse cx="300" cy="300" rx="50" ry="10" fill="#e7e5e4" stroke="#a8a29e" stroke-width="2"/>
  
  <!-- Medium planter -->
  <path d="M 370 320 L 385 390 L 425 390 L 440 320 Z" fill="#e7e5e4" stroke="#a8a29e" stroke-width="2"/>
  <ellipse cx="405" cy="320" rx="35" ry="8" fill="#e7e5e4" stroke="#a8a29e" stroke-width="2"/>
  
  <!-- Small planter -->
  <path d="M 470 340 L 480 380 L 510 380 L 520 340 Z" fill="#e7e5e4" stroke="#a8a29e" stroke-width="2"/>
  <ellipse cx="495" cy="340" rx="25" ry="6" fill="#e7e5e4" stroke="#a8a29e" stroke-width="2"/>
  
  <!-- Product name -->
  <text x="400" y="480" font-family="system-ui, sans-serif" font-size="20" fill="#334155" text-anchor="middle">Ceramic Planter Set</text>
</svg>`
  },
  
  "floor-lamp": {
    name: "Minimalist Floor Lamp",
    svg: `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
  <rect width="800" height="600" fill="#fafaf9"/>
  
  <!-- Lamp shade -->
  <path d="M 350 150 L 320 220 L 480 220 L 450 150 Z" fill="#1f2937" stroke="#111827" stroke-width="2"/>
  
  <!-- Lamp pole -->
  <rect x="395" y="220" width="10" height="250" fill="#1f2937"/>
  
  <!-- Base -->
  <ellipse cx="400" cy="470" rx="60" ry="15" fill="#1f2937"/>
  
  <!-- Light glow effect -->
  <ellipse cx="400" cy="185" rx="40" ry="20" fill="#fbbf24" opacity="0.3"/>
  
  <!-- Product name -->
  <text x="400" y="520" font-family="system-ui, sans-serif" font-size="20" fill="#334155" text-anchor="middle">Minimalist Floor Lamp</text>
</svg>`
  },
  
  "throw-pillows": {
    name: "Linen Throw Pillows",
    svg: `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
  <rect width="800" height="600" fill="#fafaf9"/>
  
  <!-- Pillow 1 -->
  <rect x="250" y="250" width="120" height="120" rx="15" fill="#f5f5f4" stroke="#d4d4d4" stroke-width="2"/>
  <rect x="260" y="260" width="100" height="100" rx="10" fill="#fafaf9" stroke="#e5e5e5" stroke-width="1"/>
  
  <!-- Pillow 2 (overlapping) -->
  <rect x="330" y="280" width="120" height="120" rx="15" fill="#e7e5e4" stroke="#a8a29e" stroke-width="2"/>
  <rect x="340" y="290" width="100" height="100" rx="10" fill="#f5f5f4" stroke="#d4d4d4" stroke-width="1"/>
  
  <!-- Texture lines -->
  <line x1="270" y1="280" x2="350" y2="280" stroke="#d4d4d4" stroke-width="1" opacity="0.5"/>
  <line x1="270" y1="300" x2="350" y2="300" stroke="#d4d4d4" stroke-width="1" opacity="0.5"/>
  <line x1="270" y1="320" x2="350" y2="320" stroke="#d4d4d4" stroke-width="1" opacity="0.5"/>
  
  <!-- Product name -->
  <text x="400" y="480" font-family="system-ui, sans-serif" font-size="20" fill="#334155" text-anchor="middle">Linen Throw Pillows</text>
</svg>`
  },
  
  "side-table": {
    name: "Walnut Side Table",
    svg: `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
  <rect width="800" height="600" fill="#fafaf9"/>
  
  <!-- Table top -->
  <rect x="300" y="250" width="200" height="30" rx="3" fill="#6b4423" stroke="#553517" stroke-width="2"/>
  
  <!-- Drawer -->
  <rect x="320" y="280" width="160" height="40" fill="#553517" stroke="#442912" stroke-width="2"/>
  <circle cx="400" cy="300" r="8" fill="#8b6f47"/>
  
  <!-- Legs -->
  <rect x="320" y="320" width="15" height="120" fill="#6b4423" stroke="#553517" stroke-width="1"/>
  <rect x="465" y="320" width="15" height="120" fill="#6b4423" stroke="#553517" stroke-width="1"/>
  
  <!-- Product name -->
  <text x="400" y="480" font-family="system-ui, sans-serif" font-size="20" fill="#334155" text-anchor="middle">Walnut Side Table</text>
</svg>`
  },
  
  "wall-art": {
    name: "Geometric Wall Art",
    svg: `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
  <rect width="800" height="600" fill="#fafaf9"/>
  
  <!-- Frame -->
  <rect x="250" y="150" width="300" height="300" fill="none" stroke="#1f2937" stroke-width="8"/>
  
  <!-- Geometric pattern -->
  <polygon points="300,200 400,250 350,350 250,300" fill="#10b981" opacity="0.8"/>
  <polygon points="400,250 500,200 550,300 450,350" fill="#0d9488" opacity="0.8"/>
  <polygon points="350,350 400,250 450,350 400,450" fill="#0891b2" opacity="0.8"/>
  
  <!-- Product name -->
  <text x="400" y="520" font-family="system-ui, sans-serif" font-size="20" fill="#334155" text-anchor="middle">Geometric Wall Art</text>
</svg>`
  },
  
  "coasters": {
    name: "Marble Coasters",
    svg: `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
  <rect width="800" height="600" fill="#fafaf9"/>
  
  <!-- Coaster stack -->
  <ellipse cx="400" cy="300" rx="80" ry="80" fill="#f5f5f4" stroke="#d4d4d4" stroke-width="2"/>
  <ellipse cx="400" cy="295" rx="80" ry="80" fill="#e7e5e4" stroke="#a8a29e" stroke-width="2"/>
  <ellipse cx="400" cy="290" rx="80" ry="80" fill="#d4d4d4" stroke="#a3a3a3" stroke-width="2"/>
  <ellipse cx="400" cy="285" rx="80" ry="80" fill="#fafaf9" stroke="#e5e5e5" stroke-width="2"/>
  
  <!-- Marble veining -->
  <path d="M 350 265 Q 380 285 420 305" fill="none" stroke="#a3a3a3" stroke-width="1" opacity="0.5"/>
  <path d="M 380 255 Q 400 275 430 285" fill="none" stroke="#a3a3a3" stroke-width="1" opacity="0.5"/>
  
  <!-- Product name -->
  <text x="400" y="480" font-family="system-ui, sans-serif" font-size="20" fill="#334155" text-anchor="middle">Marble Coasters</text>
</svg>`
  },
  
  "storage-basket": {
    name: "Woven Storage Basket",
    svg: `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
  <rect width="800" height="600" fill="#fafaf9"/>
  
  <!-- Basket body -->
  <path d="M 300 250 L 280 400 L 520 400 L 500 250 Z" fill="#d4a574" stroke="#b08d57" stroke-width="2"/>
  
  <!-- Weave pattern -->
  <line x1="320" y1="270" x2="320" y2="380" stroke="#b08d57" stroke-width="2"/>
  <line x1="350" y1="270" x2="350" y2="380" stroke="#b08d57" stroke-width="2"/>
  <line x1="380" y1="270" x2="380" y2="380" stroke="#b08d57" stroke-width="2"/>
  <line x1="410" y1="270" x2="410" y2="380" stroke="#b08d57" stroke-width="2"/>
  <line x1="440" y1="270" x2="440" y2="380" stroke="#b08d57" stroke-width="2"/>
  <line x1="470" y1="270" x2="470" y2="380" stroke="#b08d57" stroke-width="2"/>
  
  <!-- Horizontal weaves -->
  <line x1="290" y1="300" x2="510" y2="300" stroke="#b08d57" stroke-width="2"/>
  <line x1="285" y1="340" x2="515" y2="340" stroke="#b08d57" stroke-width="2"/>
  
  <!-- Handles -->
  <ellipse cx="320" cy="250" rx="25" ry="15" fill="none" stroke="#b08d57" stroke-width="3"/>
  <ellipse cx="480" cy="250" rx="25" ry="15" fill="none" stroke="#b08d57" stroke-width="3"/>
  
  <!-- Product name -->
  <text x="400" y="480" font-family="system-ui, sans-serif" font-size="20" fill="#334155" text-anchor="middle">Woven Storage Basket</text>
</svg>`
  },
  
  "pendant-light": {
    name: "Copper Pendant Light",
    svg: `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
  <rect width="800" height="600" fill="#fafaf9"/>
  
  <!-- Cord -->
  <line x1="400" y1="100" x2="400" y2="250" stroke="#1f2937" stroke-width="3"/>
  
  <!-- Pendant shade -->
  <path d="M 350 250 Q 350 320 400 320 Q 450 320 450 250" fill="#ea580c" stroke="#c2410c" stroke-width="2"/>
  <ellipse cx="400" cy="250" rx="50" ry="10" fill="#f97316" stroke="#ea580c" stroke-width="2"/>
  
  <!-- Light reflection -->
  <ellipse cx="380" cy="270" rx="15" ry="25" fill="#fb923c" opacity="0.6"/>
  
  <!-- Product name -->
  <text x="400" y="480" font-family="system-ui, sans-serif" font-size="20" fill="#334155" text-anchor="middle">Copper Pendant Light</text>
</svg>`
  },
  
  "cotton-blanket": {
    name: "Organic Cotton Blanket",
    svg: `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
  <rect width="800" height="600" fill="#fafaf9"/>
  
  <!-- Folded blanket -->
  <path d="M 250 300 L 250 400 L 550 400 L 550 250 L 350 250 Z" fill="#f5f5f4" stroke="#d4d4d4" stroke-width="2"/>
  
  <!-- Fold line -->
  <path d="M 350 250 L 350 300 L 250 300" fill="none" stroke="#d4d4d4" stroke-width="2"/>
  
  <!-- Waffle texture -->
  <rect x="370" y="270" width="15" height="15" fill="#e5e5e5"/>
  <rect x="390" y="270" width="15" height="15" fill="#e5e5e5"/>
  <rect x="410" y="270" width="15" height="15" fill="#e5e5e5"/>
  <rect x="430" y="270" width="15" height="15" fill="#e5e5e5"/>
  <rect x="370" y="290" width="15" height="15" fill="#e5e5e5"/>
  <rect x="390" y="290" width="15" height="15" fill="#e5e5e5"/>
  <rect x="410" y="290" width="15" height="15" fill="#e5e5e5"/>
  <rect x="430" y="290" width="15" height="15" fill="#e5e5e5"/>
  
  <!-- Product name -->
  <text x="400" y="480" font-family="system-ui, sans-serif" font-size="20" fill="#334155" text-anchor="middle">Organic Cotton Blanket</text>
</svg>`
  },
  
  "terracotta-vase": {
    name: "Terracotta Vase",
    svg: `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
  <rect width="800" height="600" fill="#fafaf9"/>
  
  <!-- Vase body -->
  <path d="M 380 200 Q 340 250 340 320 Q 340 380 380 420 L 420 420 Q 460 380 460 320 Q 460 250 420 200 Z" 
        fill="#dc2626" stroke="#b91c1c" stroke-width="2"/>
  
  <!-- Vase neck -->
  <rect x="380" y="180" width="40" height="40" fill="#dc2626" stroke="#b91c1c" stroke-width="2"/>
  
  <!-- Vase rim -->
  <ellipse cx="400" cy="180" rx="30" ry="8" fill="#ef4444" stroke="#dc2626" stroke-width="2"/>
  
  <!-- Texture -->
  <ellipse cx="400" cy="320" rx="40" ry="5" fill="#b91c1c" opacity="0.3"/>
  
  <!-- Product name -->
  <text x="400" y="480" font-family="system-ui, sans-serif" font-size="20" fill="#334155" text-anchor="middle">Terracotta Vase</text>
</svg>`
  },
  
  "bookends": {
    name: "Modern Bookends",
    svg: `<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
  <rect width="800" height="600" fill="#fafaf9"/>
  
  <!-- Left bookend -->
  <path d="M 250 400 L 250 250 L 300 250 L 300 350 L 350 400 Z" fill="#1f2937" stroke="#111827" stroke-width="2"/>
  
  <!-- Books -->
  <rect x="300" y="300" width="20" height="100" fill="#ef4444" stroke="#dc2626" stroke-width="1"/>
  <rect x="320" y="290" width="25" height="110" fill="#3b82f6" stroke="#2563eb" stroke-width="1"/>
  <rect x="345" y="295" width="18" height="105" fill="#10b981" stroke="#059669" stroke-width="1"/>
  <rect x="363" y="285" width="22" height="115" fill="#f59e0b" stroke="#d97706" stroke-width="1"/>
  
  <!-- Right bookend -->
  <path d="M 550 400 L 550 250 L 500 250 L 500 350 L 450 400 Z" fill="#1f2937" stroke="#111827" stroke-width="2"/>
  
  <!-- Product name -->
  <text x="400" y="480" font-family="system-ui, sans-serif" font-size="20" fill="#334155" text-anchor="middle">Modern Bookends</text>
</svg>`
  }
};

// Generate SVG files
console.log("Generating product SVGs...");

for (const [filename, data] of Object.entries(productSVGs)) {
  const filepath = join(publicDir, `${filename}.svg`);
  writeFileSync(filepath, data.svg);
  console.log(`✓ Generated ${filename}.svg`);
}

console.log("\nAll product SVGs generated successfully!");