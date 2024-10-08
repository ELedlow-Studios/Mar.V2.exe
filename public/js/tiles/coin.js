import { Player } from "../traits/Player.js";

function handle({entity, match, resolver}) {
    if (entity.traits.has(Player)) {
        entity.traits.get(Player).addCoins(1);
        //entity.player.addCoins(432980);
        const grid = resolver.matrix;
        grid.delete(match.indexX, match.indexY);
    }
}

export const coin = [handle, handle];