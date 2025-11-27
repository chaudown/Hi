# Font Setup Guide

## Directory Structure Created ✅

```
public/fonts/
├── general-sans/
│   └── (place your WOFF2 files here)
└── font-awesome/
    └── (place converted WOFF2 files here)
```

---

## Step 1: General Sans (You Already Have WOFF2) ✅

Copy your General Sans WOFF2 files into `public/fonts/general-sans/` with these **exact filenames**:

```
public/fonts/general-sans/
├── GeneralSans-Medium.woff2      (weight 500 - for body text)
└── GeneralSans-Semibold.woff2    (weight 600 - for headings/bold)
```

**If your files have different names, rename them to match the above.**

---

## Step 2: Font Awesome - Convert OTF to WOFF2

### Option A: Using Command Line (Recommended) ✅

I've installed the `woff2` tool for you. Here's how to convert:

1. **Place your Font Awesome OTF file** in the `public/fonts/font-awesome/` directory temporarily

2. **Run the conversion command:**
   ```bash
   cd public/fonts/font-awesome
   woff2_compress YourFontAwesomeFile.otf
   ```

3. **Rename the output** to the expected filename:
   ```bash
   mv YourFontAwesomeFile.woff2 FontAwesome6Pro-Solid.woff2
   ```

4. **Delete the original OTF** (optional, to save space):
   ```bash
   rm YourFontAwesomeFile.otf
   ```

**Full Example:**
```bash
cd public/fonts/font-awesome
# If your file is named "fa-solid-900.otf":
woff2_compress fa-solid-900.otf
mv fa-solid-900.woff2 FontAwesome6Pro-Solid.woff2
rm fa-solid-900.otf  # optional cleanup
```

---

### Option B: Using Online Tool (Alternative)

If command line doesn't work for some reason:

1. Visit: https://cloudconvert.com/otf-to-woff2
2. Upload your Font Awesome OTF file
3. Convert to WOFF2
4. Download and save as: `FontAwesome6Pro-Solid.woff2`
5. Place in `public/fonts/font-awesome/`

---

## Expected Final Structure

After completing both steps, you should have:

```
public/fonts/
├── general-sans/
│   ├── GeneralSans-Medium.woff2       ✅ weight 500
│   └── GeneralSans-Semibold.woff2     ✅ weight 600
└── font-awesome/
    └── FontAwesome6Pro-Solid.woff2    ✅ weight 900
```

---

## Verification Checklist

- [ ] `GeneralSans-Medium.woff2` exists in `public/fonts/general-sans/`
- [ ] `GeneralSans-Semibold.woff2` exists in `public/fonts/general-sans/`
- [ ] `FontAwesome6Pro-Solid.woff2` exists in `public/fonts/font-awesome/`
- [ ] All filenames match exactly (case-sensitive!)
- [ ] All files are WOFF2 format

---

## Once Fonts Are In Place

After you've added all the font files, let me know and I'll:
1. Set up the Next.js font loading code
2. Update the CSS to use local fonts instead of fallbacks
3. Test that everything works

---

## Quick Commands Reference

**Check if fonts are in place:**
```bash
ls -lh public/fonts/general-sans/
ls -lh public/fonts/font-awesome/
```

**Convert Font Awesome OTF to WOFF2:**
```bash
cd public/fonts/font-awesome
woff2_compress [your-font-file].otf
mv [your-font-file].woff2 FontAwesome6Pro-Solid.woff2
```

**Check file sizes:**
```bash
du -sh public/fonts/*/*.woff2
```

---

## Troubleshooting

**Q: My General Sans files have different names**
- Just rename them to match: `GeneralSans-Medium.woff2` and `GeneralSans-Semibold.woff2`

**Q: woff2_compress command not found**
- Run: `brew install woff2` (I already installed it for you)

**Q: Conversion failed**
- Try the online tool: https://cloudconvert.com/otf-to-woff2

**Q: File size concerns**
- WOFF2 files are typically 30-50% smaller than WOFF
- Each font file should be around 50-150KB
- Total fonts: ~300-500KB (very reasonable for a portfolio)

---

**Next:** Once your fonts are in place, ping me and I'll set up the font loading code!
