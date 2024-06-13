type BarData = {
  max: number;
  min: number;
};
const _draw = (
  canvasContext: CanvasRenderingContext2D,
  data: BarData[],
  barWidth: number,
  gap: number,
  height: number,
) => {
  if (!canvasContext) return;
  const halfOfHeight = height / 2;
  canvasContext.fillStyle = "rgb(75 85 99)";
  canvasContext.beginPath();

  data.forEach((dp, i) => {
    if (!canvasContext) return;
    const x = i * (barWidth + gap);
    const y = halfOfHeight + dp.min;
    const w = barWidth;
    const h = halfOfHeight + dp.max - y;

    canvasContext.fillRect(x, y, w, h);
  });
};

const _visualize = (
  canvasContext: CanvasRenderingContext2D,
  audioBuffer: AudioBuffer,
  /**
   * Width of a canvas element
   */
  width: number,
  /**
   * Height of a canvas element
   */
  height: number,
  /**
   * Width of a bar
   */
  barWidth: number = 4,
  /**
   * Gap between bars
   */
  gap: number = 1,
) => {
  const float32Array = audioBuffer.getChannelData(0);
  if (!canvasContext) {
    return;
  }
  const units = width / (barWidth + gap);
  const step = Math.floor(float32Array.length / units);
  const halfOfHeight = height / 2;

  let barData: BarData[] = [];
  let maxDataPoint = 0;

  for (let i = 0; i < units; i++) {
    const offset = i * step;
    const slice = float32Array.subarray(offset, offset + step);
    const mins: Float32Array = slice.filter((d) => d <= 0);
    const maxs: Float32Array = slice.filter((d) => d > 0);
    // Separately calculate the average of minimal and maximum numbers
    // Otherwise it will be equal to zero
    const minAvg = mins.reduce((a, c) => a + c, 0) / mins.length;
    const maxAvg = maxs.reduce((a, c) => a + c, 0) / maxs.length;

    const data = { max: maxAvg, min: minAvg };

    // Take a maximum in
    if (data.max > maxDataPoint) {
      maxDataPoint = data.max;
    }
    if (Math.abs(data.min) > maxDataPoint) {
      maxDataPoint = Math.abs(data.min);
    }
    barData.push(data);
  }

  if (halfOfHeight * 0.8 > maxDataPoint * halfOfHeight) {
    const adjustmentFactor = (halfOfHeight * 0.8) / maxDataPoint;
    barData = barData.map((dp) => ({
      max: dp.max * adjustmentFactor,
      min: dp.min * adjustmentFactor,
    }));
  }

  _draw(canvasContext, barData, barWidth, gap, height);
};

const drawTimeBar = (
  canvasContext: CanvasRenderingContext2D,
  /**
   * Width of a canvas element
   */
  width: number,
  /**
   * height of a canvas element
   */
  height: number,
  /**
   * Duration of an audio
   */
  duration: number,
) => {
  if (!canvasContext) return;
  console.log(duration);
  const barsToDraw = Math.ceil(duration);
  // ex. 400px, 40 seconds -> 1 second is 10 px
  const secondWidth = width / duration;
  canvasContext.clearRect(0, 0, width, height);
  const strokeWidth = 2;
  const tickHeight = 10;
  canvasContext.strokeStyle = "orange";
  for (let i = 0; i < barsToDraw; i++) {
    const x = Math.round(i * secondWidth);
    canvasContext.fillRect(x, height - tickHeight, strokeWidth, tickHeight);
  }
};

export function visualizeAudio(
  canvasEl: HTMLCanvasElement,
  audioSrc: string,
): Promise<{ audioDuration: number }> {
  // @ts-ignore-next-line
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  if (!audioContext) {
    throw new Error("Expected audioContext");
  }
  const { width, height } = canvasEl;
  const canvasContext = canvasEl.getContext("2d");

  if (!canvasContext) {
    throw new Error("Expected canvasContext");
  }
  return new Promise((resolve, reject) =>
    fetch(audioSrc)
      .then((res) => res.arrayBuffer())
      .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
      .then((audioBuffer) => {
        const audioDuration = audioBuffer.duration;

        drawTimeBar(canvasContext, width, height, audioBuffer.duration);
        _visualize(canvasContext, audioBuffer, width, height);
        resolve({ audioDuration });
      })
      .catch((error) => {
        reject(error);
      }),
  );
}
