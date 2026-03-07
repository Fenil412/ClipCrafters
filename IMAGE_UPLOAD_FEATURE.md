# 🖼️ Custom Image Upload Feature

## ✨ New Feature Added!

Users can now **upload their own images** for each scene instead of waiting for AI generation!

---

## 🎯 What's New

### Two Ways to Add Images:

1. **AI Generation** (Original method)
   - Uses LLM to generate images
   - Takes more time
   - Requires API credits

2. **Upload Custom Image** (NEW! ⭐)
   - Browse and upload from local device
   - Instant upload
   - No API costs
   - Full control over visuals

---

## 📋 Features

### Upload Specifications:
- **Supported Formats**: JPG, PNG, WebP
- **Max File Size**: 10 MB
- **Auto-Conversion**: Automatically converts to JPG
- **Transparency Handling**: PNG transparency converted to white background

### User Experience:
- ✅ Drag & drop or browse files
- ✅ Instant validation (size & format)
- ✅ Progress feedback with toasts
- ✅ Preview in scene viewer
- ✅ Works with video rebuild system

---

## 🎨 UI Changes

### Visuals Tab - New Section:

```
┌─────────────────────────────────────┐
│ Image Prompt                        │
│ [Text area for AI prompt]          │
│ [Save Button]                       │
├─────────────────────────────────────┤
│ Style Preset                        │
│ [Dropdown menu]                     │
├─────────────────────────────────────┤
│ [Analyze Visual Button]             │
├─────────────────────────────────────┤
│ Or Upload Custom Image  ← NEW!      │
│ [Browse & Upload Image Button]      │
│ Supported: JPG, PNG, WebP (max 10MB)│
└─────────────────────────────────────┘
```

---

## 🔧 Technical Implementation

### Backend (FastAPI):

**New Endpoint**: `POST /scenes/{scene_id}/upload-image`

```python
@router.post("/scenes/{scene_id}/upload-image")
async def upload_scene_image(
    project_id: str,
    scene_id: str,
    file: UploadFile = File(...)
):
    # Validates file type and size
    # Converts to JPG format
    # Saves to project images folder
    # Updates scene status
    # Returns updated scene
```

**Features**:
- File type validation
- Size limit enforcement (10MB)
- Automatic format conversion using PIL
- Transparency handling
- Error handling with detailed messages

### Frontend (React):

**New Function**: `handleUploadImage(sceneId, file)`

```javascript
const handleUploadImage = async (sceneId, file) => {
  // Validates file size and type
  // Creates FormData
  // Uploads via axios
  // Updates scene state
  // Shows toast notifications
};
```

**UI Components**:
- Hidden file input
- Styled upload button
- File type restrictions
- Progress indicators

---

## 🚀 How to Use

### For Users:

1. **Navigate to Scene**:
   - Select a scene from the storyboard
   - Click on "Visuals" tab

2. **Upload Image**:
   - Click "Browse & Upload Image" button
   - Select image from your device
   - Wait for upload confirmation

3. **Render Clip**:
   - Click "Render Clip" button
   - Your custom image will be used!

4. **Update Video** (if final video exists):
   - Click "Update Video" button
   - Final video rebuilds with your image

### Workflow Options:

**Option A: All AI Generated**
```
Generate Storyboard → Generate All Images → Render All Clips → Final Video
```

**Option B: Mix of AI & Custom**
```
Generate Storyboard → 
  Scene 1: Generate Image (AI)
  Scene 2: Upload Image (Custom)
  Scene 3: Generate Image (AI)
→ Render All Clips → Final Video
```

**Option C: All Custom Images**
```
Generate Storyboard → Upload Images for All Scenes → Render All Clips → Final Video
```

---

## 💡 Benefits

### Speed:
- ⚡ Instant upload vs. 30-60s AI generation
- 🚀 No waiting for API responses
- ✅ Immediate preview

### Cost:
- 💰 No API credits used
- 🆓 Unlimited uploads
- 📉 Reduced operational costs

### Control:
- 🎨 Use your own artwork
- 📸 Use photos from your library
- 🖼️ Brand consistency
- ✨ Perfect match to your vision

### Flexibility:
- 🔄 Mix AI and custom images
- 🎯 Use AI for some, custom for others
- 🛠️ Easy to replace/update images

---

## 🔒 Validation & Safety

### File Validation:
- ✅ Type checking (MIME type)
- ✅ Size limit (10MB)
- ✅ Format conversion
- ✅ Error handling

### Security:
- 🔐 File type whitelist
- 🛡️ Size restrictions
- 🚫 Malicious file prevention
- ✅ Safe file handling

---

## 📊 File Processing

### Upload Flow:
```
User selects file
    ↓
Frontend validation (size, type)
    ↓
Upload to server (FormData)
    ↓
Backend validation
    ↓
PIL Image processing
    ↓
Convert to JPG (if needed)
    ↓
Save to project/images/
    ↓
Update scene metadata
    ↓
Return success
```

### Format Conversion:
- **PNG → JPG**: Transparency to white background
- **WebP → JPG**: Direct conversion
- **JPG → JPG**: Quality optimization (95%)

---

## 🎯 Use Cases

### Perfect For:
- 📸 Using your own photos
- 🎨 Custom artwork/illustrations
- 🏢 Brand-specific imagery
- 📊 Charts and diagrams
- 🖼️ Stock photos
- 🎭 Specific scenes/characters

### When to Use AI:
- 🤖 Need unique generated content
- 🎨 Creative exploration
- ⚡ Quick prototyping
- 🔄 Variations needed

---

## 🐛 Error Handling

### Common Errors & Solutions:

**"File size exceeds 10MB"**
- Compress image before upload
- Use online tools or image editors

**"Invalid file type"**
- Convert to JPG, PNG, or WebP
- Check file extension

**"Upload failed"**
- Check internet connection
- Try smaller file
- Refresh page and retry

---

## 📝 API Reference

### Upload Image Endpoint

**URL**: `POST /scenes/{scene_id}/upload-image`

**Parameters**:
- `project_id` (query): Project ID
- `scene_id` (path): Scene ID
- `file` (form-data): Image file

**Response**:
```json
{
  "scene_id": "string",
  "image_status": "ready",
  "image_path": "/path/to/image.jpg",
  "clip_status": "outdated",
  ...
}
```

**Errors**:
- `400`: Invalid file type or size
- `404`: Scene not found
- `500`: Processing error

---

## 🎉 Summary

Users now have **complete flexibility** in choosing how to add images to their videos:

✅ **Fast**: Upload custom images instantly
✅ **Flexible**: Mix AI and custom images
✅ **Cost-effective**: No API costs for uploads
✅ **Easy**: Simple browse & upload interface
✅ **Powerful**: Full control over visuals

The feature seamlessly integrates with the existing workflow and video rebuild system!
