#!/usr/bin/env python3
"""
Image to WebP Converter
Recursively scans a folder and converts all PNG/JPG images to WebP format.
Places WebP files next to the originals.
PRESERVES TRANSPARENCY for PNG images with alpha channels.
"""

import os
import sys
from pathlib import Path
from PIL import Image
import argparse


def convert_to_webp(image_path, quality=85, lossless=False):
    """
    Convert an image to WebP format while preserving transparency.
    
    Args:
        image_path (Path): Path to the source image
        quality (int): Quality for lossy compression (1-100, default 85)
        lossless (bool): Use lossless compression (default False)
    
    Returns:
        bool: True if conversion successful, False otherwise
    """
    try:
        # Open the image
        with Image.open(image_path) as img:
            # Preserve the original mode for transparency support
            original_mode = img.mode
            
            # Handle different image modes
            if img.mode in ('RGBA', 'LA'):
                # Keep transparency! Don't convert to RGB
                converted_img = img
                print(f"🔍 Preserving transparency for {image_path.name} (mode: {original_mode})")
            elif img.mode == 'P':
                # Palette mode - check if it has transparency
                if 'transparency' in img.info:
                    # Convert palette with transparency to RGBA
                    converted_img = img.convert('RGBA')
                    print(f"🔍 Converting palette with transparency to RGBA for {image_path.name}")
                else:
                    # Convert palette without transparency to RGB
                    converted_img = img.convert('RGB')
            elif img.mode in ('RGB', 'L'):
                # Already in a good format, no transparency
                converted_img = img
            else:
                # Convert other modes to RGB (fallback)
                converted_img = img.convert('RGB')
            
            # Create output path with .webp extension
            output_path = image_path.with_suffix('.webp')
            
            # Skip if WebP already exists
            if output_path.exists():
                print(f"⚠️  WebP already exists: {output_path.name}")
                return True
            
            # Save as WebP with proper settings
            save_kwargs = {'format': 'WebP'}
            if lossless:
                save_kwargs['lossless'] = True
                # For lossless, we can preserve exact transparency
                if converted_img.mode in ('RGBA', 'LA'):
                    save_kwargs['exact'] = True
            else:
                save_kwargs['quality'] = quality
                save_kwargs['optimize'] = True
                # For lossy compression with transparency, ensure good quality
                if converted_img.mode in ('RGBA', 'LA'):
                    save_kwargs['method'] = 6  # Best compression method for transparency
            
            converted_img.save(output_path, **save_kwargs)
            
            # Get file size info
            original_size = image_path.stat().st_size
            webp_size = output_path.stat().st_size
            compression_ratio = (1 - webp_size / original_size) * 100
            
            # Show transparency status
            transparency_status = "🔳 with transparency" if converted_img.mode in ('RGBA', 'LA') else "⬜ opaque"
            
            print(f"✅ {image_path.name} → {output_path.name} {transparency_status}")
            print(f"   Original: {original_size:,} bytes | WebP: {webp_size:,} bytes | Saved: {compression_ratio:.1f}%")
            
            return True
            
    except Exception as e:
        print(f"❌ Error converting {image_path.name}: {str(e)}")
        return False


def scan_and_convert(folder_path, quality=85, lossless=False, recursive=True):
    """
    Scan folder for images and convert them to WebP.
    
    Args:
        folder_path (str): Path to the folder to scan
        quality (int): Quality for lossy compression
        lossless (bool): Use lossless compression
        recursive (bool): Scan subfolders recursively
    """
    folder = Path(folder_path)
    
    if not folder.exists():
        print(f"❌ Folder does not exist: {folder_path}")
        return
    
    if not folder.is_dir():
        print(f"❌ Path is not a directory: {folder_path}")
        return
    
    # Supported image extensions
    supported_extensions = {'.png', '.jpg', '.jpeg'}
    
    # Find all image files
    if recursive:
        pattern = "**/*"
    else:
        pattern = "*"
    
    image_files = []
    for ext in supported_extensions:
        image_files.extend(folder.glob(f"{pattern}{ext}"))
        image_files.extend(folder.glob(f"{pattern}{ext.upper()}"))
    
    if not image_files:
        print(f"🔍 No PNG/JPG images found in {folder_path}")
        return
    
    print(f"🔍 Found {len(image_files)} image(s) to convert...")
    print(f"📁 Scanning: {folder.absolute()}")
    print(f"⚙️  Settings: Quality={quality}, Lossless={lossless}, Recursive={recursive}")
    print(f"🔳 Transparency will be preserved for PNG images")
    print("-" * 60)
    
    # Convert each image
    successful = 0
    failed = 0
    
    for image_path in sorted(image_files):
        if convert_to_webp(image_path, quality, lossless):
            successful += 1
        else:
            failed += 1
    
    print("-" * 60)
    print(f"📊 Conversion complete: {successful} successful, {failed} failed")


def main():
    parser = argparse.ArgumentParser(
        description="Convert PNG and JPG images to WebP format while preserving transparency",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python webp_converter.py ./images
  python webp_converter.py ./photos --quality 90
  python webp_converter.py ./graphics --lossless  # Best for preserving transparency
  python webp_converter.py ./images --no-recursive  # Only scan main folder

Note: Transparency from PNG files will be preserved in the WebP output.
For best transparency preservation, use --lossless flag.
        """
    )
    
    parser.add_argument(
        'folder',
        help='Folder path to scan for images'
    )
    
    parser.add_argument(
        '--quality', '-q',
        type=int,
        default=85,
        choices=range(1, 101),
        metavar='1-100',
        help='Quality for lossy compression (1-100, default: 85)'
    )
    
    parser.add_argument(
        '--lossless', '-l',
        action='store_true',
        help='Use lossless compression (recommended for transparency preservation)'
    )
    
    parser.add_argument(
        '--no-recursive',
        action='store_true',
        help='Only scan the specified folder, not subfolders'
    )
    
    args = parser.parse_args()
    
    try:
        scan_and_convert(args.folder, args.quality, args.lossless, not args.no_recursive)
    except KeyboardInterrupt:
        print("\n⏹️  Conversion interrupted by user")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Unexpected error: {str(e)}")
        sys.exit(1)


if __name__ == "__main__":
    main()