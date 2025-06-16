#!/usr/bin/env python3
"""
Script to split multiple grid images into individual smaller images.
Processes all JPG files in ../assets/fates/ directory.
Original images: 4095x3264 pixels
Each sub-image: 585x816 pixels
Grid layout: 7x4 (7 columns, 4 rows)
"""

from PIL import Image
import os
import glob

def split_grid_image(input_path, output_base_dir="split_images"):
    
    # Image dimensions
    sub_width = 620
    sub_height = 866
    cols = 4
    rows = 4
    
    # Get the filename without extension for the output directory
    filename = os.path.splitext(os.path.basename(input_path))[0]
    output_dir = os.path.join(output_base_dir, filename)
    
    # Create output directory if it doesn't exist
    os.makedirs(output_dir, exist_ok=True)
    
    # Open the original image
    try:
        img = Image.open(input_path)
        print(f"Processing: {os.path.basename(input_path)} ({img.size[0]}x{img.size[1]} pixels)")
        
        # Verify the image dimensions match expectations
        expected_width = cols * sub_width
        expected_height = rows * sub_height
        
        if img.size != (expected_width, expected_height):
            print(f"  Warning: Image size {img.size} doesn't match expected {expected_width}x{expected_height}")
            print("  Proceeding anyway...")
        
        # Split the image
        image_count = 0
        for row in range(rows):
            for col in range(cols):
                # Calculate crop coordinates
                left = col * sub_width
                top = row * sub_height
                right = left + sub_width
                bottom = top + sub_height
                
                # Crop the sub-image
                sub_img = img.crop((left, top, right, bottom))
                
                # Save the sub-image with source filename prefix
                sub_filename = f"{filename}_{row:02d}_{col:02d}.webp"
                output_path = os.path.join(output_dir, sub_filename)
                sub_img.save(output_path)
                
                image_count += 1
        
        print(f"  Completed: {image_count} images saved to '{output_dir}'")
        return True
        
    except FileNotFoundError:
        print(f"  Error: Could not find input file '{input_path}'")
        return False
    except Exception as e:
        print(f"  Error processing {input_path}: {str(e)}")
        return False

# def process_directory(input_pattern="../assets/fates/*.jpg", output_base_dir="split_images"):
    """
    Process all JPG files matching the pattern.
    
    Args:
        input_pattern (str): Glob pattern for input files
        output_base_dir (str): Base directory for all outputs
    """
    
    # Find all matching files
    image_files = glob.glob(input_pattern)
    
    if not image_files:
        print(f"No files found matching pattern: {input_pattern}")
        return
    
    print(f"Found {len(image_files)} image files to process")
    print("=" * 50)
    
    successful = 0
    failed = 0
    
    # Process each file
    for i, image_path in enumerate(image_files, 1):
        print(f"\n[{i}/{len(image_files)}]", end=" ")
        
        if split_grid_image(image_path, output_base_dir):
            successful += 1
        else:
            failed += 1
    
    # Summary
    print("\n" + "=" * 50)
    print(f"Processing complete!")
    print(f"Successfully processed: {successful} files")
    print(f"Failed: {failed} files")
    print(f"Total sub-images created: {successful * 28}")
    print(f"Output directory: {output_base_dir}")

def main():
    """
    Main function - processes all JPG files in ../assets/fates/ directory.
    """
    
    input_pattern = "../assets/base/*.jpg"
    output_base_dir = "split_images"
    
    print("Batch Grid Image Splitter")
    print("========================")
    print(f"Input pattern: {input_pattern}")
    print(f"Output base directory: {output_base_dir}")
    print(f"Expected sub-image size: 585x816 pixels")
    print(f"Expected grid per image: 7x4 (28 total images)")
    print()
    
    # process_directory(input_pattern, output_base_dir)
    split_grid_image("../assets/campaign/dc-back.webp")

if __name__ == "__main__":
    main()