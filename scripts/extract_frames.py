"""
Video Frame Extractor for Image Sequence Generation
====================================================

Extracts all frames from a video file with maximum visual quality
to replace the existing public/sequence folder.

Usage:
    python extract_frames.py

Requirements:
    pip install opencv-python Pillow

System Enhancement Brief:
    This script converts a video file into a high-quality image sequence
    for use in scroll-based animations. It prioritizes visual fidelity
    over file size, using maximum JPEG quality settings and preserving
    the original video resolution.

Impact:
    - Enables seamless video-to-sequence conversion for scrollytelling
    - Maintains visual parity with source video at highest quality
    - Supports the existing naming convention for drop-in replacement

Technical Changes:
    1. Uses OpenCV for frame extraction with no interpolation artifacts
    2. Saves as JPEG with quality=100 (maximum) for visual fidelity

Metric to Monitor:
    - Visual quality comparison between source video and extracted frames
"""

import os
import sys
from pathlib import Path

try:
    import cv2
    from PIL import Image
except ImportError as e:
    print(f"Missing dependency: {e}")
    print("\nPlease install required packages:")
    print("  pip install opencv-python Pillow")
    sys.exit(1)


def extract_frames(
    video_path: str,
    output_dir: str,
    prefix: str = "ezgif-frame-",
    extension: str = ".jpg",
    jpeg_quality: int = 100
) -> int:
    """
    Extract all frames from a video file with maximum quality.
    
    Args:
        video_path: Path to the source video file
        output_dir: Directory to save extracted frames
        prefix: Filename prefix for extracted frames
        extension: Output file extension (.jpg recommended for quality)
        jpeg_quality: JPEG quality setting (1-100, higher = better quality)
    
    Returns:
        Number of frames extracted
    """
    # Validate video path
    if not os.path.exists(video_path):
        raise FileNotFoundError(f"Video file not found: {video_path}")
    
    # Create output directory
    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)
    
    # Open video file
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        raise RuntimeError(f"Failed to open video: {video_path}")
    
    # Get video properties
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = cap.get(cv2.CAP_PROP_FPS)
    width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    duration = total_frames / fps if fps > 0 else 0
    
    print("=" * 60)
    print("VIDEO FRAME EXTRACTOR")
    print("=" * 60)
    print(f"Source:      {video_path}")
    print(f"Resolution:  {width}x{height}")
    print(f"Total Frames:{total_frames}")
    print(f"FPS:         {fps:.2f}")
    print(f"Duration:    {duration:.2f}s")
    print(f"Output:      {output_dir}")
    print(f"Quality:     JPEG {jpeg_quality}% (Maximum)")
    print("=" * 60)
    print()
    
    # Clear existing frames in output directory
    existing_frames = list(output_path.glob(f"{prefix}*{extension}"))
    if existing_frames:
        print(f"Removing {len(existing_frames)} existing frames...")
        for frame_path in existing_frames:
            frame_path.unlink()
        print("Done.")
        print()
    
    # Extract frames
    frame_count = 0
    print("Extracting frames...")
    
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        
        frame_count += 1
        
        # Generate filename with zero-padded frame number (3 digits)
        # Starting from 001 to match existing convention
        filename = f"{prefix}{frame_count:03d}{extension}"
        filepath = output_path / filename
        
        # Convert BGR to RGB for PIL
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        
        # Use PIL for maximum quality JPEG saving
        img = Image.fromarray(frame_rgb)
        img.save(
            filepath,
            "JPEG",
            quality=jpeg_quality,
            subsampling=0,  # 4:4:4 chroma subsampling (best quality)
            optimize=False   # Don't optimize for size
        )
        
        # Progress indicator
        progress = (frame_count / total_frames) * 100
        print(f"\r  Progress: {progress:5.1f}% ({frame_count}/{total_frames})", end="", flush=True)
    
    cap.release()
    print()
    print()
    
    print("=" * 60)
    print("EXTRACTION COMPLETE")
    print("=" * 60)
    print(f"Frames extracted: {frame_count}")
    print(f"Output directory: {output_dir}")
    print("=" * 60)
    
    return frame_count


def main():
    """Main entry point for frame extraction."""
    
    # Define paths relative to the script location
    script_dir = Path(__file__).parent
    project_root = script_dir.parent
    
    video_path = project_root / "public" / "ezgif-3043c5d8b1cb3ab7.mp4"
    output_dir = project_root / "public" / "sequence"
    
    print()
    print("  ╔═══════════════════════════════════════════════════════╗")
    print("  ║  NATURO VIDEO SEQUENCE EXTRACTOR                      ║")
    print("  ║  Prioritizing Visual Quality                          ║")
    print("  ╚═══════════════════════════════════════════════════════╝")
    print()
    
    try:
        frame_count = extract_frames(
            video_path=str(video_path),
            output_dir=str(output_dir),
            prefix="ezgif-frame-",
            extension=".jpg",
            jpeg_quality=100  # Maximum quality per user request
        )
        
        if frame_count > 0:
            print()
            print("✓ Success! The sequence folder has been updated.")
            print("  You can now use the new frames in your application.")
            print()
            return 0
        else:
            print("⚠ Warning: No frames were extracted from the video.")
            return 1
            
    except FileNotFoundError as e:
        print(f"✗ Error: {e}")
        return 1
    except RuntimeError as e:
        print(f"✗ Error: {e}")
        return 1
    except Exception as e:
        print(f"✗ Unexpected error: {e}")
        import traceback
        traceback.print_exc()
        return 1


if __name__ == "__main__":
    sys.exit(main())
