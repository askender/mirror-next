import axios from 'axios'
import sizeOf from 'image-size'

export const calculateSizes = async markdown => {
	return Object.fromEntries(await Promise.all([...markdown.matchAll(/!\[[^\]]*\]\((?<url>.*?)\s*("(?:.*[^"])")?\s*\)/gm)].map(async match => [match.groups.url, await calculateImageSize(match.groups.url)])))
}

export const calculateImageSize = async url => {
	const image = await axios.get(url, { responseType: 'arraybuffer' }).then(res => Buffer.from(res.data, 'binary'))

	return sizeOf(image)
}
