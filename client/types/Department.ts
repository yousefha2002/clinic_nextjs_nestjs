export interface Department {
    id: number;
    name: string;
    doctors?: { username: string }[];
}