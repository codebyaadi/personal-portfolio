import { ImageResponse } from 'next/og';

export const size = { width: 512, height: 512 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#131316',
        color: '#f4f5f6',
        fontSize: 340,
        fontWeight: 700,
        fontFamily: 'sans-serif',
      }}
    >
      a<span style={{ color: '#5fd4d6' }}>.</span>
    </div>,
    size
  );
}
