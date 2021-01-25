/* eslint-disable */
declare namespace PetstoreRaw {
    namespace RequestBodies {
        export type Pet = Schemas.Pet;
        export type UserArray = Schemas.User[];
    }
    namespace Schemas {
        export interface Address {
            /**
             * example:
             * 437 Lytton
             */
            street?: string;
            /**
             * example:
             * Palo Alto
             */
            city?: string;
            /**
             * example:
             * CA
             */
            state?: string;
            /**
             * example:
             * 94301
             */
            zip?: string;
        }
        export interface ApiResponse {
            code?: number; // int32
            type?: string;
            message?: string;
        }
        export interface Category {
            /**
             * example:
             * 1
             */
            id?: number; // int64
            /**
             * example:
             * Dogs
             */
            name?: string;
        }
        export interface Customer {
            /**
             * example:
             * 100000
             */
            id?: number; // int64
            /**
             * example:
             * fehguy
             */
            username?: string;
            address?: Address[];
        }
        export interface Order {
            /**
             * example:
             * 10
             */
            id?: number; // int64
            /**
             * example:
             * 198772
             */
            petId?: number; // int64
            /**
             * example:
             * 7
             */
            quantity?: number; // int32
            shipDate?: string; // date-time
            /**
             * Order Status
             * example:
             * approved
             */
            status?: "placed" | "approved" | "delivered";
            complete?: boolean;
        }
        export interface Pet {
            /**
             * example:
             * 10
             */
            id?: number; // int64
            /**
             * example:
             * doggie
             */
            name: string;
            category?: Category;
            photoUrls: string[];
            tags?: Tag[];
            /**
             * pet status in the store
             */
            status?: "available" | "pending" | "sold";
        }
        export interface Tag {
            id?: number; // int64
            name?: string;
        }
        export interface User {
            /**
             * example:
             * 10
             */
            id?: number; // int64
            /**
             * example:
             * theUser
             */
            username?: string;
            /**
             * example:
             * John
             */
            firstName?: string;
            /**
             * example:
             * James
             */
            lastName?: string;
            /**
             * example:
             * john@email.com
             */
            email?: string;
            /**
             * example:
             * 12345
             */
            password?: string;
            /**
             * example:
             * 12345
             */
            phone?: string;
            /**
             * User Status
             * example:
             * 1
             */
            userStatus?: number; // int32
        }
    }
}
declare namespace PetstoreRawPaths {
    namespace AddPet {
        export type RequestBody = PetstoreRaw.Schemas.Pet;
        namespace Responses {
            export type $200 = PetstoreRaw.Schemas.Pet;
            export interface $405 {
            }
        }
    }
    namespace CreateUser {
        export type RequestBody = PetstoreRaw.Schemas.User;
        namespace Responses {
            export type Default = PetstoreRaw.Schemas.User;
        }
    }
    namespace CreateUsersWithListInput {
        export type RequestBody = PetstoreRaw.Schemas.User[];
        namespace Responses {
            export type $200 = PetstoreRaw.Schemas.User;
            export interface Default {
            }
        }
    }
    namespace DeleteOrder {
        namespace Parameters {
            export type OrderId = number; // int64
        }
        export interface PathParameters {
            orderId: Parameters.OrderId /* int64 */;
        }
        namespace Responses {
            export interface $400 {
            }
            export interface $404 {
            }
        }
    }
    namespace DeletePet {
        export interface HeaderParameters {
            api_key?: Parameters.ApiKey;
        }
        namespace Parameters {
            export type ApiKey = string;
            export type PetId = number; // int64
        }
        export interface PathParameters {
            petId: Parameters.PetId /* int64 */;
        }
        namespace Responses {
            export interface $400 {
            }
        }
    }
    namespace DeleteUser {
        namespace Parameters {
            export type Username = string;
        }
        export interface PathParameters {
            username: Parameters.Username;
        }
        namespace Responses {
            export interface $400 {
            }
            export interface $404 {
            }
        }
    }
    namespace FindPetsByStatus {
        namespace Parameters {
            export type Status = "available" | "pending" | "sold";
        }
        export interface QueryParameters {
            status?: Parameters.Status;
        }
        namespace Responses {
            export type $200 = PetstoreRaw.Schemas.Pet[];
            export interface $400 {
            }
        }
    }
    namespace FindPetsByTags {
        namespace Parameters {
            export type Tags = string[];
        }
        export interface QueryParameters {
            tags?: Parameters.Tags;
        }
        namespace Responses {
            export type $200 = PetstoreRaw.Schemas.Pet[];
            export interface $400 {
            }
        }
    }
    namespace GetInventory {
        namespace Responses {
            export interface $200 {
                [name: string]: number; // int32
            }
        }
    }
    namespace GetOrderById {
        namespace Parameters {
            export type OrderId = number; // int64
        }
        export interface PathParameters {
            orderId: Parameters.OrderId /* int64 */;
        }
        namespace Responses {
            export type $200 = PetstoreRaw.Schemas.Order;
            export interface $400 {
            }
            export interface $404 {
            }
        }
    }
    namespace GetPetById {
        namespace Parameters {
            export type PetId = number; // int64
        }
        export interface PathParameters {
            petId: Parameters.PetId /* int64 */;
        }
        namespace Responses {
            export type $200 = PetstoreRaw.Schemas.Pet;
            export interface $400 {
            }
            export interface $404 {
            }
        }
    }
    namespace GetUserByName {
        namespace Parameters {
            export type Username = string;
        }
        export interface PathParameters {
            username: Parameters.Username;
        }
        namespace Responses {
            export type $200 = PetstoreRaw.Schemas.User;
            export interface $400 {
            }
            export interface $404 {
            }
        }
    }
    namespace LoginUser {
        namespace Parameters {
            export type Password = string;
            export type Username = string;
        }
        export interface QueryParameters {
            username?: Parameters.Username;
            password?: Parameters.Password;
        }
        namespace Responses {
            export type $200 = string;
            export interface $400 {
            }
        }
    }
    namespace LogoutUser {
        namespace Responses {
            export interface Default {
            }
        }
    }
    namespace PlaceOrder {
        export type RequestBody = PetstoreRaw.Schemas.Order;
        namespace Responses {
            export type $200 = PetstoreRaw.Schemas.Order;
            export interface $405 {
            }
        }
    }
    namespace UpdatePet {
        export type RequestBody = PetstoreRaw.Schemas.Pet;
        namespace Responses {
            export type $200 = PetstoreRaw.Schemas.Pet;
            export interface $400 {
            }
            export interface $404 {
            }
            export interface $405 {
            }
        }
    }
    namespace UpdatePetWithForm {
        namespace Parameters {
            export type Name = string;
            export type PetId = number; // int64
            export type Status = string;
        }
        export interface PathParameters {
            petId: Parameters.PetId /* int64 */;
        }
        export interface QueryParameters {
            name?: Parameters.Name;
            status?: Parameters.Status;
        }
        namespace Responses {
            export interface $405 {
            }
        }
    }
    namespace UpdateUser {
        namespace Parameters {
            export type Username = string;
        }
        export interface PathParameters {
            username: Parameters.Username;
        }
        export type RequestBody = PetstoreRaw.Schemas.User;
        namespace Responses {
            export interface Default {
            }
        }
    }
    namespace UploadFile {
        namespace Parameters {
            export type AdditionalMetadata = string;
            export type PetId = number; // int64
        }
        export interface PathParameters {
            petId: Parameters.PetId /* int64 */;
        }
        export interface QueryParameters {
            additionalMetadata?: Parameters.AdditionalMetadata;
        }
        export type RequestBody = string; // binary
        namespace Responses {
            export type $200 = PetstoreRaw.Schemas.ApiResponse;
        }
    }
}
