export declare class GrantsController {
    search(keyword: string): Promise<{
        id: string;
        title: string;
        agency: string;
        opportunityNumber: string;
        closeDate: string;
    }[] | {
        error: string;
    }>;
}
