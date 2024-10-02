export const generateGradient = async (imageInput: any) => {
  let imageFile;

  // Function to fetch image from URL and convert it to a Blob, then to a File
  const urlToFile = async (url: any) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const fileName = url.split("/").pop(); // Extract the file name from the URL
    return new File([blob], fileName, { type: blob.type });
  };

  // Determine if the input is a URL or a File object
  if (typeof imageInput === "string") {
    // It's a URL, convert it to a file
    imageFile = await urlToFile(imageInput);
  } else if (imageInput instanceof File) {
    // It's already a file
    imageFile = imageInput;
  } else {
    throw new Error("Invalid image input. Must be a file or URL.");
  }

  // Create an object URL for the image to use in a canvas
  const imageObjectUrl = URL.createObjectURL(imageFile);

  // Function to extract dominant color using canvas
  const extractDominantColor = (image: any) => {
    // Create a canvas element
    const canvas = document.createElement("canvas");
    const ctx: any = canvas.getContext("2d");

    // Set canvas dimensions to match the image
    canvas.width = image.width;
    canvas.height = image.height;

    // Draw the image onto the canvas
    ctx.drawImage(image, 0, 0);

    // Get image data from the canvas
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Calculate the average color (dominant color)
    let r = 0,
      g = 0,
      b = 0;
    const length = data.length / 4;

    for (let i = 0; i < data.length; i += 4) {
      r += data[i]; // Red
      g += data[i + 1]; // Green
      b += data[i + 2]; // Blue
    }

    // Average the color values
    r = Math.floor(r / length);
    g = Math.floor(g / length);
    b = Math.floor(b / length);

    // Return the average color
    return [r, g, b];
  };

  // Function to lighten the color
  const lightenColor = ({
    r,
    g,
    b,
    percentage,
  }: {
    r: any;
    g: any;
    b: any;
    percentage: any;
  }) => {
    return [
      Math.min(Math.floor(r + (255 - r) * percentage), 255),
      Math.min(Math.floor(g + (255 - g) * percentage), 255),
      Math.min(Math.floor(b + (255 - b) * percentage), 255),
    ];
  };

  // Create a new Image object to load the image
  const img = new Image();
  img.src = imageObjectUrl;

  // Return a Promise that resolves once the image has loaded
  return new Promise((resolve, reject) => {
    img.onload = () => {
      // Extract the dominant color from the image
      const [r, g, b] = extractDominantColor(img);
      const percentage = 0.5;
      // Lighten the dominant color for the top of the gradient
      const [lightR, lightG, lightB] = lightenColor({ r, g, b, percentage }); // 50% lighter

      // Generate the CSS gradient from bottom to top
      const cssGradient = `linear-gradient(to top, rgba(0,0,0,1), rgba(${lightR},${lightG},${lightB},1))`;

      // Revoke the object URL to free memory
      URL.revokeObjectURL(imageObjectUrl);

      // Resolve with the CSS gradient
      resolve(cssGradient);
    };

    img.onerror = (err) => {
      reject("Error loading image: " + err);
    };
  });
};
