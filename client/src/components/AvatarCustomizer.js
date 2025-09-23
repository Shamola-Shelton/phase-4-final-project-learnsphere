import React, { useState } from 'react';
import { Palette, Eye, Shirt, Crown } from 'lucide-react';

function AvatarCustomizer({ user }) {
  // Provide a default avatar if user.avatar is undefined
  const defaultAvatar = {
    skinColor: '#F4A460',
    hairColor: '#8B4513',
    hairStyle: 'short',
    eyeColor: '#4B5563',
    outfit: 'casual',
    accessory: 'none'
  };

  const [avatar, setAvatar] = useState(user?.avatar || defaultAvatar);

  const skinColors = ['#F4A460', '#DEB887', '#CD853F', '#8B4513', '#A0522D', '#D2691E'];
  const hairColors = ['#8B4513', '#000000', '#FFD700', '#FF4500', '#9400D3', '#32CD32'];
  const hairStyles = ['short', 'long', 'curly', 'bald', 'ponytail'];
  const eyeColors = ['#4B5563', '#059669', '#2563EB', '#7C3AED', '#DC2626'];
  const outfits = ['casual', 'formal', 'sporty', 'hoodie', 'dress'];
  const accessories = ['none', 'glasses', 'hat', 'earrings', 'necklace'];

  const handleAvatarChange = (property, value) => {
    setAvatar(prev => ({ ...prev, [property]: value }));
  };

  const AvatarPreview = () => (
    <div className="avatar-preview">
      <svg viewBox="0 0 100 100" className="avatar-svg">
        {/* Face */}
        <circle cx="50" cy="40" r="25" fill={avatar.skinColor} />
        
        {/* Hair */}
        {avatar.hairStyle !== 'bald' && (
          <path
            d="M25 35 Q50 15 75 35 Q75 25 50 20 Q25 25 25 35"
            fill={avatar.hairColor}
          />
        )}
        
        {/* Eyes */}
        <circle cx="42" cy="38" r="3" fill={avatar.eyeColor} />
        <circle cx="58" cy="38" r="3" fill={avatar.eyeColor} />
        
        {/* Mouth */}
        <path d="M45 48 Q50 52 55 48" stroke={avatar.skinColor} strokeWidth="2" fill="none" />
        
        {/* Body/Outfit */}
        <rect
          x="35"
          y="65"
          width="30"
          height="35"
          rx="15"
          fill={
            avatar.outfit === 'formal' ? '#1F2937' :
            avatar.outfit === 'sporty' ? '#EF4444' :
            avatar.outfit === 'hoodie' ? '#6B7280' :
            avatar.outfit === 'dress' ? '#EC4899' :
            '#3B82F6'
          }
        />
        
        {/* Accessories */}
        {avatar.accessory === 'glasses' && (
          <g>
            <circle cx="42" cy="38" r="6" fill="none" stroke="#000" strokeWidth="1" />
            <circle cx="58" cy="38" r="6" fill="none" stroke="#000" strokeWidth="1" />
            <line x1="48" y1="38" x2="52" y2="38" stroke="#000" strokeWidth="1" />
          </g>
        )}
        {avatar.accessory === 'hat' && (
          <ellipse cx="50" cy="25" rx="20" ry="8" fill="#DC2626" />
        )}
      </svg>
    </div>
  );

  const ColorPicker = ({ colors, selected, onChange, icon, title }) => (
    <div className="picker-section">
      <div className="picker-label">
        {icon}
        <span>{title}</span>
      </div>
      <div className="picker-options">
        {colors.map((color) => (
          <button
            key={color}
            onClick={() => onChange(color)}
            className={`color-option ${selected === color ? 'selected' : ''}`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );

  const OptionPicker = ({ options, selected, onChange, icon, title }) => (
    <div className="picker-section">
      <div className="picker-label">
        {icon}
        <span>{title}</span>
      </div>
      <div className="picker-options">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`option-btn ${selected === option ? 'selected' : ''}`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="avatar-customizer">
      <AvatarPreview />
      
      <div className="customizer-controls">
        <ColorPicker
          colors={skinColors}
          selected={avatar.skinColor}
          onChange={(color) => handleAvatarChange('skinColor', color)}
          icon={<Palette size={16} color="#FF7F50" />}
          title="Skin"
        />
        
        <ColorPicker
          colors={hairColors}
          selected={avatar.hairColor}
          onChange={(color) => handleAvatarChange('hairColor', color)}
          icon={<Crown size={16} color="#FFD700" />}
          title="Hair"
        />
        
        <OptionPicker
          options={hairStyles}
          selected={avatar.hairStyle}
          onChange={(style) => handleAvatarChange('hairStyle', style)}
          icon={<Crown size={16} color="#8A2BE2" />}
          title="Style"
        />
        
        <ColorPicker
          colors={eyeColors}
          selected={avatar.eyeColor}
          onChange={(color) => handleAvatarChange('eyeColor', color)}
          icon={<Eye size={16} color="#2563EB" />}
          title="Eyes"
        />
        
        <OptionPicker
          options={outfits}
          selected={avatar.outfit}
          onChange={(outfit) => handleAvatarChange('outfit', outfit)}
          icon={<Shirt size={16} color="#10B981" />}
          title="Outfit"
        />
        
        <OptionPicker
          options={accessories}
          selected={avatar.accessory}
          onChange={(accessory) => handleAvatarChange('accessory', accessory)}
          icon={<Crown size={16} color="#EC4899" />}
          title="Accessory"
        />
      </div>
    </div>
  );
}

export default AvatarCustomizer;
