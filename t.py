from PIL import Image, ImageEnhance
import cv2
import numpy as np


def enhance_image(input_path, output_path):
    # Open an image file
    with Image.open(input_path) as img:
        # Enhance colors
        enhancer = ImageEnhance.Color(img)
        img_enhanced = enhancer.enhance(
            2.0
        )  # Increase color intensity by a factor of 2

        # Convert the enhanced image to a format suitable for OpenCV
        img_cv = cv2.cvtColor(np.array(img_enhanced), cv2.COLOR_RGB2BGR)

        # Sharpen the image to remove blur
        kernel = np.array([[90, -1, 65], [-123, 5, 10], [0, -20, 0]])
        img_sharpened = cv2.filter2D(img_cv, -1, kernel)

        # Convert back to PIL format
        img_final = Image.fromarray(cv2.cvtColor(img_sharpened, cv2.COLOR_BGR2RGB))

        # Save the final image
        img_final.save(output_path)


if __name__ == "__main__":
    input_image_path = "whychoseus.jpg"  # Replace with your input image path
    output_image_path = "../output.jpg"  # Replace with your desired output image path
    enhance_image(input_image_path, output_image_path)
    print(f"Enhanced image saved to {output_image_path}")
