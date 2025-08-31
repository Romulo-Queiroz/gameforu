export type Game = {
  id: number;
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre?: string;
  platform?: string;
  publisher?: string;
  developer?: string;
  release_date?: string;
  freetogame_profile_url?: string;
};

export type GameFilters = {
  platform?: "pc" | "browser";
  category?: "mmorpg" | "shooter" | "strategy" | "racing" | "sports" | "social" | "sandbox" | "open-world" | "survival" | "pvp" | "pve" | "pixel" | "voxel" | "zombie" | "turn-based" | "first-person" | "third-Person" | "top-down" | "tank" | "space" | "sailing" | "side-scroller" | "superhero" | "permadeath" | "card" | "battle-royale" | "mmo" | "mmofps" | "mmotps" | "3d" | "2d" | "anime" | "fantasy" | "sci-fi" | "fighting" | "action-rpg" | "action" | "military" | "martial-arts" | "flight" | "low-spec" | "tower-defense" | "horror" | "mmorts";
  sortBy?: "release-date" | "popularity" | "alphabetical";
};

export type GameServiceResponse = {
  games: Game[];
  loading: boolean;
  error: string | null;
};

