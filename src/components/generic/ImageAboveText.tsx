interface ImageAboveTextProps {
  image: string;
  text: string;
}

const ImageAboveText = ({ image, text }: ImageAboveTextProps) => (
  <div className="size-auto p-4">
    <img src={image} alt="" className="opacity-50 object-contain" />
    <div className="flex items-center justify-center">
      <span>{text}</span>
    </div>
  </div>
);

export default ImageAboveText;