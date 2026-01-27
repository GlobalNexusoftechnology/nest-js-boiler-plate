export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  resource_type: 'image' | 'video' | 'raw';
}
