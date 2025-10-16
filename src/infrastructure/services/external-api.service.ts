import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

export interface AppointmentData {
  running: number;
  service_date_license: string;
  machine: string;
  service_date_name: string;
  service_date_tel: string;
  need_date: string;
  time_date_need: string;
  branch_need: string;
  Items: string;
  report_repair: string;
  type_repair: string;
  channel: string;
  confirmation: string;
  date_book: string;
  branch_book: string;
  time_book: string;
  notes: string;
  token_line: string;
  status_groups_line: string;
  status_appointments: string;
  informer: string;
  group_car: string;
  lift: string;
  booking: string;
  completed_time: string;
  product: string;
  take_time: string;
  team?: string;
  nameteam: string;
  ID_send: string;
  ID_form: string;
  type?: string;
  date_contact: string;
  user_insert?: string;
  contact_status: string;
  details_contact: string;
  MIRAI: string;
  ledger?: string;
  responsible?: string;
  revenue?: string;
  lccess_status?: string;
  status_spraying?: string;
  time_to?: string;
  delivery_time_car_wash?: string;
  repair_status?: string;
  status_link?: string;
  sa: string;
  line_x?: string;
  mr_referral?: string;
  mr_date?: string;
  status_connect: string;
  date_connect: string;
  phone_connect: string;
  user_connect?: string;
  sound_connect: string;
  line_link: string;
  REC: string;
  service_date_latlng?: string;
  service_date_location?: string;
  activity_service?: string;
  PSI: string;
  update_time: string;
  update_user: string;
  create_time: string;
  create_user?: string;
  row_spreadsheet: string;
}

@Injectable()
export class ExternalApiService {
  private readonly logger = new Logger(ExternalApiService.name);
  private readonly API_URL = 'https://n8n-pmsg.agilesoftgroup.com/webhook/pms-service/appointment';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async fetchAppointments(): Promise<AppointmentData[]> {
    try {
      this.logger.log('Fetching appointments from external API');
      
      const payload = {
        dateBook: "today()"
      };

      const response = await firstValueFrom(
        this.httpService.post<AppointmentData[]>(this.API_URL, payload, {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 30000, // 30 seconds timeout
        })
      );

      this.logger.log(`Successfully fetched ${response.data.length} appointments`);
      return response.data;
    } catch (error) {
      this.logger.error('Failed to fetch appointments from external API', error.stack);
      throw new Error(`External API error: ${error.message}`);
    }
  }

  /**
   * Transform appointment data to task format
   * @param appointment - Raw appointment data from external API
   * @returns Transformed data compatible with task entity
   */
  transformAppointmentToTask(appointment: AppointmentData) {
    return {
      // Map appointment fields to task entity fields
      vehicle_registration: appointment.service_date_license || null,
      engine_number: appointment.machine || `ENG-${appointment.running}`, // Generate if not available
      chassis_number: appointment.running?.toString() || Date.now().toString(), // Use running number or timestamp
      
      // Additional mapping based on available data
      external_id: appointment.running?.toString(),
      appointment_date: appointment.date_book,
      appointment_time: appointment.time_book,
      customer_name: appointment.service_date_name,
      customer_phone: appointment.service_date_tel,
      branch: appointment.branch_book,
      service_type: appointment.type_repair,
      items: appointment.Items,
      repair_report: appointment.report_repair,
      informer: appointment.informer,
      status: appointment.status_appointments,
      notes: appointment.notes,
      
      // Meta data
      created_from_external: true,
      external_create_time: appointment.create_time,
      external_update_time: appointment.update_time,
    };
  }
}