import { Expose } from "class-transformer";

export class appointmentDto {
    @Expose()
    id:string;

    @Expose()
    note:string;

    @Expose()
    date:string;

    @Expose()
    patientId:string;

    @Expose()
    doctorId:string;

    @Expose()
    status:string
}