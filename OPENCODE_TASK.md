# PERFORMANCE OPTIMIZATION TASK

## Current State (BASELINE)
- Dist folder: 16 MB (TOO LARGE)
- 4 icon files @ 1.5 MB each = 6 MB bloat
- Uploads folder: Multiple 1.5 MB PNGs
- No lazy loading implemented
- Browserslist DB 8 months old

## REQUIRED OPTIMIZATIONS

### 1. Image Optimization (CRITICAL)
Optimize these 4 icons in public/:
- team-icon.png (1.5 MB)
- shield-icon.png (1.5 MB) 
- handshake-icon.png (1.5 MB)
- scales-icon.png (1.4 MB)

Target: < 50 KB each while maintaining quality
Tools: Use sharp (npm install sharp) or squoosh-cli
Format: Keep PNG but compress, or convert to WebP with PNG fallback

### 2. Uploads Folder Optimization
- Convert all public/uploads/*.png to WebP
- Keep originals as backup
- Target: < 200 KB each

### 3. Add Lazy Loading
Add loading="lazy" to images below the fold:
- Team section images
- Practice area images (if any)
- Any images not in Hero/Header

Edit: src/components/Team.tsx, src/components/PracticeAreas.tsx

### 4. Update Browserslist
Run: npx update-browserslist-db@latest

### 5. Verify Build
Run: npm run build
Check dist/ size reduction

## ACCEPTANCE CRITERIA
- [ ] All 4 icons under 50 KB
- [ ] Dist folder under 5 MB total
- [ ] npm run build succeeds
- [ ] Lazy loading attributes present
- [ ] Browserslist updated

## REPORT BACK
When complete, run:
openclaw gateway wake --text "DONE: Performance optimization complete - Dist size: [X] MB (was 16 MB) - Icons optimized: 4 files - Build: Success" --mode now
