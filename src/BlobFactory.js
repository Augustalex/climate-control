import {BlobCharacter, BlobStateTemplate} from "@/Blob.js";
import {BlobWander} from "@/BlobWander.js";
import {BlobRunFromFire} from "@/BlobRunFromFire.js";
import {BlobWork} from "@/BlobWork.js";
import {BlobFloat} from "@/BlobFloat.js";
import {BlobBehaviourController} from "@/BlobBehaviourController.js";

export function BlobFactory({
    storeHolder,
    map,
    house,
    disaster,
    seed,
}) {

    return {
        create
    };

    function create() {
        const newBlobId = setupNewBlob();

        const blob = BlobCharacter({
            state: () => {
                const state = storeHolder.get().state;
                return state.blobs[newBlobId];
            }
        });

        const blobWander = BlobWander({ blob, map });
        const blobRunFromFire = BlobRunFromFire({ blob, map });
        const blobWork = BlobWork({ blob, house, map, seed });
        const blobFloat = BlobFloat({ blob, map, disaster });
        const blobBehaviourController = BlobBehaviourController({
            blob,
            blobWork,
            blobWander,
            blobRunFromFire,
            blobFloat,
            seed,
            disaster
        });

        return {
            actions: [
                blobWork.run,
                blobWander.run,
                blobRunFromFire.run,
                blobFloat.run,
                blobBehaviourController.run
            ]
        };
    }

    function setupNewBlob() {
        const state = storeHolder.get().state;
        const id = state.blobs.length;
        storeHolder.get().state.blobs.push(BlobStateTemplate({ id, x: Math.round(Math.random() * 10) + 1 }));
        return id;
    }
}
