export interface Attachment {
    chatId: string;
    name: string;
    type: AttachmentTypes;
    size: number;
    base64: string;
}

export interface Message {
    chatId: string | null;
    id?: string;
    content?: string;
    buttons?: string;
    file?: Attachment;
    event?: string;
    rating?: string;
    authorId?: string;
    authorTimestamp: string;
    authorFirstName?: string;
    authorLastName?: string;
    authorRole?: string;
    created?: string;
    preview?: string;
    updated?: string;
    data?: {
        forwarding_validation?: string;
    };
}

export enum AttachmentTypes {
    // TODO not all types displayed correctly or specified in the AC
    PDF = 'application/pdf',
    PNG = 'image/png',
    JPEG = 'image/jpeg',
    TXT = 'text/plain',
    DOCX = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ODT = 'application/vnd.oasis.opendocument.text',
    XLSX = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ODS = 'ods',
    BDOC = 'application/vnd.etsi.asic-e+zip',
    CDOC = 'application/x-cdoc',
    ASICE = 'application/vnd.etsi.asic-e+zip',
    MP3 = 'audio/mpeg',
    WAV = 'audio/wav',
    M4A = 'audio/x-m4a',
    MP4 = 'video/mp4',
    WEBM = 'video/webm',
    OGG = 'video/ogg',
    MOV = 'video/quicktime',
}
