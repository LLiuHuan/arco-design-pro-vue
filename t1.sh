#!/bin/bash

/*
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-04-21 18:02:32
 * @LastEditTime: 2025-04-21 18:02:34
 * @LastEditors: LLiuHuan
 */

# 定义要删除的文件夹名称
folders=("node_modules" "dist")

# 遍历每个要删除的文件夹名称
for folder in "${folders[@]}"; do
    # 查找所有匹配的文件夹
    find . -type d -name "$folder" -print0 | while IFS= read -r -d '' dir; do
        echo "正在删除: $dir"
        if rm -rf "$dir"; then
            echo "已删除: $dir"
        else
            echo "删除 $dir 时出错"
        fi
    done
done    
