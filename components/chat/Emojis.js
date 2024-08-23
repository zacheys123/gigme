import React from "react";
import EmojiContainer from "./EmojiContainer";
import EmojiPickerContainer from "./EmojiPickerContainer";
import PropTypes from "prop-types";

const Emojis = ({ pickEmoji }) => {
  return (
    <EmojiContainer>
      <EmojiPickerContainer onEmojiClick={pickEmoji} />
    </EmojiContainer>
  );
};
Emojis.propTypes = {
  pickEmoji: PropTypes.func,
};
export default Emojis;
