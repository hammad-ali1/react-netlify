type ThumbProps = {
  imageURL: string;
};
function Thumb({ imageURL }: ThumbProps) {
  return <img src={imageURL} alt="Thumb" width={100} height={100} />;
}

export default Thumb;
