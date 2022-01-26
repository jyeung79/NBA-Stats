from flask import Flask, jsonify
from nba_api.stats.static import players
from nba_api.stats.endpoints import  playergamelog
import json

app = Flask(__name__)

@app.route('/')
def index():
    return 'index'

@app.route("/stats/<p_name>/<season>/<mode>", methods=["GET"])
def season_query(p_name, season, mode):
    # remove 0 if want list of players
    name_result = players.find_players_by_full_name(p_name)

    player_found = True

    if  len(name_result) != 1:
        player_found == False

    player_to_query = ['id', 'full_name']
    player_query = { rel_key: name_result[0][rel_key] for rel_key in player_to_query }

    season_query = playergamelog.PlayerGameLog(player_id=player_query['id'], season = season)

    stats_to_query = ['PTS', 'REB', 'AST','STL','BLK']
    relevant_stats = season_query.get_data_frames()[0][stats_to_query]

    if mode == "sum":
        stats_sum = relevant_stats.sum()
        for info in player_to_query:
            stats_sum[info] = player_query[info]
        return jsonify(stats_sum)

    elif mode == "avg":
        stats_avg = relevant_stats.mean()
        for info in player_to_query:
            stats_avg[info] = player_query[info]
        
        return jsonify(stats_avg)

if __name__ == "__main__":
    app.run(debug=True)