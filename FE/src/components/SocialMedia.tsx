import { FaFacebook, FaInstagram, FaTwitter  } from "react-icons/fa";

const SocialMedia = () => {
  return (
    <div className="flex gap-2">
      <FaFacebook className="cursor-pointer" />
      <FaInstagram className="cursor-pointer" />
      <FaTwitter className="cursor-pointer" />
    </div>
  )
}

export default SocialMedia